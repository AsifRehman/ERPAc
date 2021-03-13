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
                RepeaterItem item = e.Item;
                Label partyTID = (item.FindControl("lblPTID") as Label);
                if (ptID == partyTID.Text)
                {
                    isChanged = false;
                }
                else
                {
                    isChanged = true;
                }
                ptID = partyTID.Text;
            }
        }
    }
}