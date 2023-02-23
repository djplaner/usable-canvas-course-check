/**
 * Define suite of methods to interact with Canvas during app set up
 */

/**
 * @function checkContext
 * @returns {Object} containing editMode, courseId, modulesPage
 * @description Check the current URL to determine it it is Canvas modules
 * page, identify the courseId and if we're in edit mode
 */

export function checkContext(): object {
  const location = window.location.href;

  let context : {
    editMode: boolean, // true, iff the "Student View" button is showing
    courseId: number, // Canvas course id
    // name of the Canvas course page we're on
    // e.g. "modules", "assignments", "pages", "files", "people", "settings"
    currentPage: string,
    csrfToken: string,  // cross-site request forgery token
  } = {
    editMode:  false,    
    courseId: null,     
    currentPage: null,
    csrfToken: null
  };

  // replace # at end of string
  let url = new URL(window.location.href);

  url.hash = "";
  const documentUrl = url.href;

  // courseId
  // Following adapted from https://github.com/msdlt/canvas-where-am-I
  // if ENV object has a COURSE_ID field and it is an integer, set context.courseId
  if (ENV.COURSE_ID && ENV.COURSE_ID.match(/^\d+$/)) {
    context.courseId = ENV.COURSE_ID;
  } else {
    // try and extract it from the URL

    let urlPartIncludingCourseId = documentUrl.split("courses/")[1];
    if (urlPartIncludingCourseId) {
      const localCourseId = urlPartIncludingCourseId.split("/")[0];
      // if localCourseId is an integer, set context.courseId
      if (localCourseId.match(/^\d+$/)) {
        context.courseId = parseInt(localCourseId);
      }
    }
  }

  // fail here if we've not gotten a courseId
  if (!context.courseId) {
    throw new Error("No courseId found");
  }

  // extract from URL https://<hostname>/courses/<courseId>/<currentPage>
  let regEx = new RegExp(`courses/${context.courseId}/(.*)(/*|#*|#[^/]+)$`);
  const matches = documentUrl.match(regEx)
  if (matches) {
    context.currentPage = matches[1];
  } else {
    // must be on the front page, set a default label that hopefully
    // no-one will accidentally use as the name of a page
    context.currentPage = "ccc_CourseFrontPage"
  }

  // editMode true iff a#easy_student_view exists
  // TODO - perhaps replace/extend this with another check using
  // the course object later
  context.editMode = document.getElementById("easy_student_view") !== null;

  context.csrfToken = setCsrfToken();

  return context;
}

/**
 * @function setCsrfToken
 * @returns {String} csrfToken
 * Following adapted from https://github.com/msdlt/canvas-where-am-I
 * Function which returns csrf_token from cookie see:
 * https://community.canvaslms.com/thread/22500-mobile-javascript-development
 */
function setCsrfToken(): string {
  let csrfRegex = new RegExp("^_csrf_token=(.*)$");
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    let match = csrfRegex.exec(cookie);
    if (match) {
      return decodeURIComponent(match[1]);
    }
  }
  return null;
}

/**
 * @function requestCourseObject
 * @param {Integer} courseId
 * @description Request the course object from Canvas
 */

export async function requestCourseObject(courseId: number, csrfToken: string) {
  let callUrl = `/api/v1/courses/${courseId}`;


  const response = await fetch(callUrl, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRF-Token": csrfToken,
    },
  });
  if (!response.ok) {
    throw new Error(
      `requestCourseObject: error ${response.status}`
    );
  }

  const data = await response.json();

  if (data.length !== 0) {
    return data;
  }
}

/**
 * Fetch function for retrieving information from a single endpoint request
 * @param {String} reqUrl Endpoint URL to query the Canvas API
 * @returns Response Object
 */
export const wf_fetchData = async (reqUrl) => {
  const url = reqUrl;
  try {
    const res = await fetch(url);
    const body = await res.json();
    const msg = {
      status: res.status,
      res: res,
      body: body,
    };
    return msg;
  } catch (e) {
    console.error(`Could not fetch requested information: ${e}`);
  }
};

export const wf_deleteData = async (reqUrl, csrf) => {
  const url = reqUrl;
  try {
    const res = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": csrf,
      },
    });
    if (res.status === 404)
      // Endpoint not found
      return null;
    if (res.status === 401)
      // User not authorized
      return null;
    const json = await res.json();
    return json;
  } catch (e) {
    console.error(`Could not delete requested information: ${e}`);
  }
};

/**
 * @function wf_postData
 * @param reqUrl
 * @param data
 * @param csrf
 * @param post - POST or PUT
 * @returns json response (if successful), null otherwise
 *
 */

export const wf_postData = async (
  reqUrl: string,
  data: string,
  csrf: string,
  post = "POST"
) => {
  const url = reqUrl;
  try {
    const res = await fetch(reqUrl, {
      method: post,
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
        "X-CSRF-Token": csrf,
      },
      body: data,
    });
    if (res.status === 404)
      // Endpoint not found
      return null;
    if (res.status === 401)
      // User not authorized
      return null;
    const json = await res.json();
    return json;
  } catch (e) {
    console.error(`Could not post requested information: ${e}`);
  }
};

/**
 * Fetch function for retrieving information from multiple endpoint requests
 * @param {Array} reqData Array of endpoint URL's to query the Canvas API
 * @returns Array of Response Objects
 */
export const wf_fetchDataMulti = async (reqData) => {
  return Promise.all(
    reqData.map(async (data) => {
      try {
        const res = await fetch(data);
        if (res.status === 404)
          // Endpoint not found
          return null;
        if (res.status === 401)
          // User not authorized
          return null;
        const json = await res.json();
        return json;
      } catch (e) {
        console.error(`Could not fetch requested information: ${e}`);
      }
    })
  );
};

/**
 * @function getPageName
 * @param {String} pageName - name of the page
 * @param {String} courseId - id of the course
 * @param {Function} callBack - function to call when the page name is found (or not)
 * @description Given the visible name of a page (e.g. "Canvas Collections Configuration")
 * - Slugify the name (e.g. "canvas-collections-configuration")
 * - use the Canvas API to get the page Object
 * - return the pageName and the results (positive or not) to the callBack function
 * - The pageObject will be null if page not found
 */

export function getPageName(
  pageName: string,
  courseId: string,
  callBack: Function
) {

  if (pageName === undefined ) {
    console.trace()
    alert("getPageName: pageName is undefined")
    return
  }

/*  if (pageName!=="") {
    // only do this if we've a valid page name
    String.prototype.slugify = function (separator = "-") {
      return this.toString()
        .normalize("NFD") // split an accented letter in the base letter and the accent
        .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace("@", "at")
        .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, separator);
    };
    const slugifiedPageName = pageName.slugify();
    const apiUrl = `https://${document.location.hostname}/api/v1/courses/${courseId}/pages/${slugifiedPageName}`;

    wf_fetchData(apiUrl).then((msg) => {
        callBack(pageName, msg.body);
    }); 
  } */
}
