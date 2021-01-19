using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ERPAc
{

    public partial class GridTest : System.Web.UI.Page
    {
        public static string ptID;
        public static bool isChanged = true;

        protected void Page_Load(object sender, EventArgs e)
        {
            ptID = "";

        }

        protected void Repeater1_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {
                if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
                {
                    RepeaterItem item = e.Item;
                    Label partyTID = (item.FindControl("lblPTID") as Label);
                    ptID = partyTID.Text;
                    if ( ptID == partyTID.Text)
                    {
                        isChanged = false;
                    }
                    else
                    {
                        isChanged = true;
                    }
                }

                //RepeaterItem item = e.Item;
                //int CurPtID = int.Parse((item.FindControl("lblCL") as Label).Text);

                //if (CurPtID != ptID)
                //{
                //    (item.FindControl("Label2") as Label).Text = "Changed";
                //}
                //else
                //{
                //    (item.FindControl("Label2") as Label).Text = "";
                //}

                //Reference the Repeater Item.
                //Reference the Controls.
            }
        }
    }
}