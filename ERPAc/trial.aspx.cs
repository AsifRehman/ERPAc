using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ERPAc
{
    public partial class Trial : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            this.ddlPartyID.Focus();

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            this.GridView1.DataBind();
            this.ddlPartyID.Focus();
        }
    }
}