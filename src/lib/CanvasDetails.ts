/**
 * @class CanvasDetails
 * @description Given a course Id retrieve the info Collections requires
 * about the course and its modules via Canvas API calls
 */

import { wf_fetchData } from "./CanvasSetup";

export class CanvasDetails {
  public courseObject: object;
  public courseCode: string;


  public courseModules: object;


  private config: object;
  //  private csrfToken: string;
  private currentHostName: string;
  private baseApiUrl: string;
  //  private courseId: number;
  private finishedCallBack: Function;
  //  private calendar: UniversityDateCalendar;

  /**
   * Set up the object and request from Canvas details on the user and their current enrollments
   * @callBack finishedCallBack - function to change the state of the parent component
   * @param {Object} config - configuration object
   */

  constructor(finishedCallBack, config) {
    this.finishedCallBack = finishedCallBack;
    this.config = config;

    this.currentHostName = document.location.hostname;
    this.baseApiUrl = `https://${this.currentHostName}/api/v1`;
    // convert courseId to integer
    this["config"]["courseId"] = parseInt(this["config"]["courseId"]);

    this.requestCourseObject();
  }

  /**
   * @method refreshCanvasDetails
   * @param {Function} callBack
   */
  refreshCanvasDetails(callBack: Function) {
    this.finishedCallBack = callBack;
    this.requestCourseObject();
  }

  /**
   * @function requestCourseObject
   *
   */

  requestCourseObject() {
    wf_fetchData(`${this.baseApiUrl}/courses/${this.config.courseId}`).then(
      (msg) => {
        if (msg.status === 200) {
          this.courseObject = msg.body;
          //this.requestModuleInformation();
        }
      }
    );
  }

  requestModuleInformation() {
    wf_fetchData(
      `${this.baseApiUrl}/courses/${this.config.courseId}/modules?include=content_details&per_page=500`
    ).then((msg) => {
      if (msg.status === 200) {
        this.courseModules = msg.body;
        this.finishedCallBack();
      }
    });
  }
}
