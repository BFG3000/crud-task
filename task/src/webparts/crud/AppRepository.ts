import { WebPartContext } from "@microsoft/sp-webpart-base";

export class AppRepository {
  public _context: WebPartContext;
  public siteurl: string;

  constructor(context: WebPartContext) {
    // Context to fetch from SharePoint.
    // In demo we just use dummy data.
    this._context = context;
    this.siteurl = context.pageContext.web.absoluteUrl;
  }
}
