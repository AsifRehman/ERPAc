<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="test1.aspx.cs" Inherits="ERPAc.test1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="card card-info">
                    <div class="card-header">
                        <h3 class="card-title">Horizontal Form</h3>
                    </div>
                    <!-- /.card-header -->
                    <!-- form start -->
                    <form class="form-horizontal">
                        <div class="card-body">
                            <div class="form-group row">
                                <label for="txtPartyID" class="col-sm-2 col-form-label">Party:</label>
                                <div class="col-sm-4">
<%--                                    <input type="text" class="form-control" id="inputEmail3" placeholder="Party">--%>
                                    <asp:DropDownList CssClass="form-control select2" ID="DropDownList1" runat="server" DataSourceID="SqlDataSource1" DataTextField="PartyName" DataValueField="PartyNameID">
                                    </asp:DropDownList>
                                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:ACCOUNT19ConnectionString %>" SelectCommand="SELECT [PartyNameID], [PartyName] FROM [tbl_Party]"></asp:SqlDataSource>
                                </div>
                                <label for="txtSDate" class="col-sm-2 col-form-label">Password</label>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="txtSDate" placeholder="Password">
                                </div>
                                <label for="txtEDate" class="col-sm-2 col-form-label">Password</label>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="txtEDate" placeholder="Password">
                                </div>
                            </div>
                        </div>
                        <!-- /.card-body -->
                        <div class="card-footer">
                            <asp:Button ID="btnClick" runat="server" Text="Show Report" />
                            <button type="submit" class="btn btn-default float-right">Cancel</button>
                        </div>
                        <!-- /.card-footer -->
                    </form>
                </div>

            </div>
            <div class="row">
                <div class="col-lg-12">
                    <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataSourceID="SqlDataSource2">
                        <Columns>
                            <asp:BoundField DataField="VocNo" HeaderText="VocNo" SortExpression="VocNo" />
                            <asp:BoundField DataField="SrNo" HeaderText="SrNo" SortExpression="SrNo" />
                            <asp:BoundField DataField="Date" HeaderText="Date" SortExpression="Date" />
                            <asp:BoundField DataField="PartyID" HeaderText="PartyID" SortExpression="PartyID" />
                            <asp:BoundField DataField="TType" HeaderText="TType" SortExpression="TType" />
                            <asp:BoundField DataField="Description" HeaderText="Description" SortExpression="Description" />
                            <asp:BoundField DataField="NetCredit" HeaderText="NetCredit" SortExpression="NetCredit" />
                            <asp:BoundField DataField="NetDebit" HeaderText="NetDebit" SortExpression="NetDebit" />
                            <asp:BoundField DataField="BAL" HeaderText="BAL" SortExpression="BAL" />
                            <asp:BoundField DataField="PartyRef" HeaderText="PartyRef" SortExpression="PartyRef" />
                            <asp:BoundField DataField="pVocNo" HeaderText="pVocNo" SortExpression="pVocNo" />
                        </Columns>
                    </asp:GridView>
                    <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:ACCOUNT19ConnectionString %>" SelectCommand="SELECT * FROM [AcStat] WHERE ([PartyID] = @PartyID)">
                        <SelectParameters>
                            <asp:ControlParameter ControlID="DropDownList1" Name="PartyID" PropertyName="SelectedValue" Type="Int32" />
                        </SelectParameters>
                    </asp:SqlDataSource>
                </div>
            </div>
        </div>
    </section>

    <script>
        $(function () {
            $('.select2').select2();
        });
    </script>
</asp:Content>
