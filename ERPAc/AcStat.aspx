<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AcStat.aspx.cs" Inherits="AlkaramWeb.AcStat" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div class="row">
        <div class="col-sm-4">
            <asp:DropDownList CssClass="js-example-basic-single" ID="DropDownList1" runat="server" DataSourceID="SqlDataSource2" DataTextField="PartyName" DataValueField="PartyNameID">
            </asp:DropDownList>
            <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:ACCOUNT19ConnectionString %>" SelectCommand="SELECT [PartyNameID], [PartyName] FROM [tbl_Party]"></asp:SqlDataSource>
        </div>
        <div class="col-sm-4">
            <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Show" />
        </div>
        <div class="col-sm-4">
            <div class="form-group">
                <div class="form-control">
                    <p>Date:
                        <input type="text" id="sDate"></p>
                </div>
            </div>
        </div>
    </div>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:ACCOUNT19ConnectionString %>" SelectCommand="SELECT VocNo, SrNo, Date, PartyID, TType, Description, NetCredit, NetDebit, BAL FROM AcStat WHERE (PartyID = @PartyID) ORDER BY Date, VocNo, SrNo">
                <SelectParameters>
                    <asp:ControlParameter ControlID="DropDownList1" Name="PartyID" PropertyName="SelectedValue" Type="Int32" />
                </SelectParameters>
            </asp:SqlDataSource>

            <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False"
                DataSourceID="SqlDataSource1" CssClass="table table-bordered table-hover table-responsive" OnRowDataBound="GridView1_RowDataBound">
                <Columns>
                    <asp:BoundField DataField="VocNo" HeaderText="VocNo" SortExpression="VocNo">
                        <ItemStyle HorizontalAlign="Center" />
                    </asp:BoundField>
                    <asp:BoundField DataField="SrNo" HeaderText="SrNo" SortExpression="SrNo">
                        <ItemStyle HorizontalAlign="Center" />
                    </asp:BoundField>
                    <asp:BoundField DataField="Date" HeaderText="Date" SortExpression="Date"
                        DataFormatString="{0:dd-MM-yy}">
                        <ItemStyle HorizontalAlign="Center" />
                    </asp:BoundField>
                    <asp:BoundField DataField="TType" HeaderText="TType" SortExpression="TType" />
                    <asp:BoundField DataField="Description" HeaderText="Description" SortExpression="Description" />
                    <asp:BoundField DataField="NetCredit" HeaderText="NetCredit" SortExpression="NetCredit" />
                    <asp:BoundField DataField="NetDebit" HeaderText="NetDebit" SortExpression="NetDebit" />
                    <asp:TemplateField ItemStyle-HorizontalAlign="Right" HeaderText="Balance">
                        <ItemTemplate>
                            <asp:Label ID="lbl_sBal" runat="server"></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </ContentTemplate>
        <Triggers>
            <asp:AsyncPostBackTrigger ControlID="Button1" EventName="Click" />
        </Triggers>
    </asp:UpdatePanel>

    <script>
        jQuery(document).ready(function () {
            jQuery('.js-example-basic-single').select2();
            //$('#sDate').datepicker();
        });
    </script>

</asp:Content>
