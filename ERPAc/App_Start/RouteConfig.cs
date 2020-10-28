using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.UI;
using Microsoft.AspNet.FriendlyUrls;

namespace ERPAc
{
    public static class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            var settings = new FriendlyUrlSettings();
            settings.AutoRedirectMode = RedirectMode.Permanent;
            routes.EnableFriendlyUrls(settings, new MyWebFormsFriendlyUrlResolver());

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                    name: "Default",
                    url: "{controller}/{action}/{id}",
                    defaults: new { action = "Index", id = UrlParameter.Optional }
                );
        }

        public class MyWebFormsFriendlyUrlResolver : Microsoft.AspNet.FriendlyUrls.Resolvers.WebFormsFriendlyUrlResolver
        {
            protected override bool TrySetMobileMasterPage(HttpContextBase httpContext, Page page, String mobileSuffix)
            {
                if (mobileSuffix == "Mobile")
                {
                    return false;
                }
                else
                {
                    return base.TrySetMobileMasterPage(httpContext, page, mobileSuffix);
                }
            }
        }
    }
}
