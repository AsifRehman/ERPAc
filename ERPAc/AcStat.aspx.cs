using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AlkaramWeb
{
    public partial class AcStat : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            this.DropDownList1.Focus();

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            this.GridView1.DataBind();
        }

        int total = 0;
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                //cast the current row to a datarowview
                DataRowView row = e.Row.DataItem as DataRowView;

                //add the registrations to the total
                total += Convert.ToInt32(row["Bal"]);

                //find the label in the row with findcontrol and cast it back to one
                Label label = e.Row.FindControl("lbl_sBal") as Label;

                //fill the label with the current total
                label.Text = string.Format("{0:0,00;(0,000);0;0}", total);
            }
        }
    }
}