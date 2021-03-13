<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="GridTest.aspx.cs" Inherits="ERPAc.GridTest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <asp:Repeater ID="Repeater1" runat="server" DataSourceID="SqlDataSource2" OnItemDataBound="Repeater1_ItemDataBound">
        <HeaderTemplate>
            <table class="table table-bordered table-sm">
        </HeaderTemplate>
        <ItemTemplate>
            <tr>
                <td>
                    <asp:Label Text='<%# Eval("PartyTypeID") %>' runat="server" ID="lblPTID"></asp:Label>
                </td>
                <td>
                    <asp:Label Text='<%# Eval("PartyID") %>' runat="server"></asp:Label>
                </td>
                <td>
                    <asp:Label Text='<%# Eval("PartyName") %>' runat="server"></asp:Label>
                </td>
                <td>
                    <asp:Label Text='<%# Eval("CL") %>' runat="server" ID="lblCL"></asp:Label>
                </td>
                <td>
                    <asp:Label Text=<%# isChanged %> runat="server" ID="Label2"></asp:Label>
                </td>
            </tr>
        </ItemTemplate>
        <FooterTemplate>
            </table>
        </FooterTemplate>
    </asp:Repeater>
    <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:ACCOUNT19ConnectionString %>" SelectCommand="SELECT PartyName, PartyTypeID, PartyID, OP, Dr, Cr, CL FROM dbo.fn_Trial(@sDt, @eDt) AS Trial_1 ORDER BY PartyTypeID, PartyID">
        <SelectParameters>
            <asp:Parameter DefaultValue="01-MAR-2020" Name="sDt" Type="DateTime" />
            <asp:Parameter DefaultValue="01-MAR-2021" Name="eDt" Type="DateTime" />
        </SelectParameters>
    </asp:SqlDataSource>
</asp:Content>
