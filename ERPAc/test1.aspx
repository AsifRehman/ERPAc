<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="test1.aspx.cs" Inherits="ERPAc.test1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <form class="form-horizontal">
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Party:</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="inputEmail3" placeholder="Party">
                            </div>
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-4">
                                <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
                            </div>
                        </div>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                        <button type="submit" class="btn btn-info">Sign in</button>
                        <button type="submit" class="btn btn-default float-right">Cancel</button>
                    </div>
                    <!-- /.card-footer -->
                </form>
            </div>
        </div>
    </section>

</asp:Content>
