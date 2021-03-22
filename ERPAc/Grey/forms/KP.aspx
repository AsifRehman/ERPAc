<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="KP.aspx.cs" Inherits="ERPAc.forms.gr.KP" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Kachi Parchi</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Advanced Form</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
        <section class="content">
            <div class="container-fluid">

                <div class="row">
                    <!-- left column -->
                    <div class="col-md-12 col-xs-12">
                        <!-- jquery validation -->
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Kachi Parchi <small></small></h3>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->
                            <form role="form" id="quickForm" class="form-inline">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="txtVocNo" class="col-sm-1">VocNo: </label>
                                        <input type="number" class="form-control col-sm-1" id="txtVocNo">

                                        <label for="txtGreyLot" class="col-sm-1">GreyLot:</label>
                                        <input type="text" class="form-control col-sm-1" id="txtGreyLot">

                                        <label for="txtDate" class="col-sm-1">S Date:</label>
                                        <div class="input-group date col-sm-2" id="Date" data-target-input="nearest">
                                            <asp:TextBox CssClass="form-control datetimepicker-input" data-target="#Date" runat="server" ID="txtDate"></asp:TextBox>
                                            <div class="input-group-append" data-target="#Date" data-toggle="datetimepicker">
                                                <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                                            </div>
                                        </div>

                                        <label for="ddlPartyID" class="col-sm-1">Party:</label>
                                        <asp:DropDownList ID="ddlPartyID" runat="server" CssClass="form-control select2 col-sm-3" DataSourceID="SqlDataSource1" DataTextField="PartyName" DataValueField="PartyNameID"></asp:DropDownList>
                                        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:GREY19ConnectionString %>" SelectCommand="SELECT [PartyNameID], [PartyName] FROM [gr_Party] ORDER BY [PartyName]"></asp:SqlDataSource>

                                    </div>
                                    <br />
                                    <div class="form-group">
                                        <label for="ddlSupplierID" class="col-sm-1">Supplier:</label>
                                        <asp:DropDownList ID="ddlSupplierID" runat="server" CssClass="form-control select2 col-sm-3" DataSourceID="SqlDataSource2" DataTextField="Supplier" DataValueField="SupplierID"></asp:DropDownList>
                                        <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:GREY19ConnectionString %>" SelectCommand="SELECT [SupplierID], [Supplier] FROM [GreySupplier] ORDER BY [Supplier]"></asp:SqlDataSource>

                                        <label for="ddlLoom" class="col-sm-1">Loom:</label>
                                        <asp:DropDownList ID="ddlLoom" runat="server" CssClass="form-control select2 col-sm-3" DataSourceID="SqlDataSource3" DataTextField="Loom" DataValueField="Loom"></asp:DropDownList>
                                        <asp:SqlDataSource ID="SqlDataSource3" runat="server" ConnectionString="<%$ ConnectionStrings:GREY19ConnectionString %>" SelectCommand="SELECT DISTINCT Loom FROM PParchi ORDER BY Loom"></asp:SqlDataSource>



                                    </div>
                                    <br />
                                    <div class="form-group">
                                        <label for="ddlItemID" class="col-sm-1">Item:</label>
                                        <asp:DropDownList ID="ddlItemID" runat="server" CssClass="form-control select2 col-sm-3" DataSourceID="SqlDataSource4" DataTextField="ItemName" DataValueField="ItemID"></asp:DropDownList>
                                        <asp:SqlDataSource ID="SqlDataSource4" runat="server" ConnectionString="<%$ ConnectionStrings:GREY19ConnectionString %>" SelectCommand="SELECT ItemID, ItemName, ItemTypeID FROM greyItems WHERE (ItemCategoryID = 1) ORDER BY ItemName"></asp:SqlDataSource>

                                        <label for="txtRemarks" class="col-sm-1">Remarks:</label>
                                        <input type="text" class="form-control col-sm-2" id="txtRemarks">

                                    </div>
                                    <div class="form-group">
                                        <label for="txtThan" class="col-sm-1">Than:</label>
                                        <input type="number" class="form-control col-sm-1" id="txtThan">


                                        <label for="txtRec" class="col-sm-1">Received:</label>
                                        <input type="number" class="form-control col-sm-1" id="txtRec">


                                        <label for="sel1">Mtr/Yds:</label>
                                        <select class="form-control" id="sel1">
                                            <option selected>Mtr</option>
                                            <option>Yds</option>
                                        </select>

                                        <label for="txtEL" class="col-sm-1">EL:</label>
                                        <select class="form-control" id="txtEL">
                                            <option>5/1</option>
                                            <option>5/2</option>
                                            <option>5/3</option>
                                            <option>5/4</option>
                                            <option>5/5</option>
                                            <option>5/6</option>
                                            <option>5/7</option>
                                            <option>5/8</option>
                                            <option>5/9</option>
                                            <option>5/10</option>
                                            <option>10/1</option>
                                            <option>10/2</option>
                                            <option>10/3</option>
                                            <option>10/4</option>
                                            <option>10/5</option>
                                            <option>10/6</option>
                                            <option>10/7</option>
                                            <option>10/8</option>
                                            <option>10/9</option>
                                            <option>10/10</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="txtByPerson" class="col-sm-1">By Person:</label>
                                        <input type="text" class="form-control col-sm-2" id="txtByPerson">

                                        <label for="txtVehicle" class="col-sm-1">Vehicle:</label>
                                        <input type="text" class="form-control col-sm-2" id="txtVehicle">
                                    </div>

                                    <div class="form-group">

                                    </div>

                                </div>
                                <!-- /.card-body -->
                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                        <!-- /.card -->
                    </div>
                    <!--/.col (left) -->
                    <!-- right column -->
                    <div class="col-md-6">
                    </div>
                    <!--/.col (right) -->
                </div>
            </div>
        </section>
    </div>

    <script>
        $(function () {
            //Initialize Select2 Elements
            $('.select2').select2()

            //Initialize Select2 Elements
            $('.select2bs4').select2({
                theme: 'bootstrap4'
            })

            //Datemask dd/mm/yyyy
            $('#sdd').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
            //Datemask2 mm/dd/yyyy
            $('#datemask2').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' })
            //Money Euro
            $('[data-mask]').inputmask()

            //Date range picker
            $('#Date').datetimepicker({
                format: 'DD/MM/YYYY'
            });
            $('#eDate').datetimepicker({
                format: 'DD/MM/YYYY'
            });

            //Date range picker
            $('#reservation').daterangepicker()
            //Date range picker with time picker
            $('#reservationtime').daterangepicker({
                timePicker: true,
                timePickerIncrement: 30,
                locale: {
                    format: 'MM/DD/YYYY hh:mm A'
                }
            })
            //Date range as a button
            $('#daterange-btn').daterangepicker(
                {
                    ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    startDate: moment().subtract(29, 'days'),
                    endDate: moment()
                },
                function (start, end) {
                    $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
                }
            )

            //Timepicker
            $('#timepicker').datetimepicker({
                format: 'LT'
            })

            //Bootstrap Duallistbox
            $('.duallistbox').bootstrapDualListbox()

            //Colorpicker
            $('.my-colorpicker1').colorpicker()
            //color picker with addon
            $('.my-colorpicker2').colorpicker()

            $('.my-colorpicker2').on('colorpickerChange', function (event) {
                $('.my-colorpicker2 .fa-square').css('color', event.color.toString());
            });

            $("input[data-bootstrap-switch]").each(function () {
                $(this).bootstrapSwitch('state', $(this).prop('checked'));
            });

        })
    </script>



</asp:Content>
