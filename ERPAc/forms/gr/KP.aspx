<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="KP.aspx.cs" Inherits="ERPAc.forms.gr.KP" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Account Statement</h1>
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
                    <div class="col-md-12">
                        <!-- jquery validation -->
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Quick Example <small>jQuery Validation</small></h3>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->
                            <form role="form" id="quickForm" novalidate="novalidate">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" name="email" class="form-control is-invalid" id="exampleInputEmail1" placeholder="Enter email" aria-describedby="exampleInputEmail1-error" aria-invalid="true">
                                        <span id="exampleInputEmail1-error" class="error invalid-feedback">Please enter a vaild email address</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                                    </div>
                                    <div class="form-group mb-0">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" name="terms" class="custom-control-input" id="exampleCheck1">
                                            <label class="custom-control-label" for="exampleCheck1">I agree to the <a href="#">terms of service</a>.</label>
                                        </div>
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


                <div class="card card-default">
                    <div class="card-header">
                        <h3 class="card-title">Kachi Parchi</h3>

                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i></button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Party</label>
                                    <asp:DropDownList Style="width: 100%;" ID="ddlPartyID" runat="server" CssClass="form-control select2" DataSourceID="SqlDataSource1" DataTextField="PartyName" DataValueField="PartyNameID"></asp:DropDownList>
                                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:ACCOUNT19ConnectionString %>" SelectCommand="SELECT [PartyNameID], [PartyName] FROM [tbl_Party] ORDER BY [PartyName]"></asp:SqlDataSource>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>S Date:</label>
                                    <div class="input-group date" id="sDate" data-target-input="nearest">
                                        <asp:TextBox CssClass="form-control datetimepicker-input" data-target="#sDate" runat="server" ID="txtSDate"></asp:TextBox>
                                        <div class="input-group-append" data-target="#sDate" data-toggle="datetimepicker">
                                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>E Date:</label>
                                    <div class="input-group date" id="eDate" data-target-input="nearest">
                                        <asp:TextBox CssClass="form-control datetimepicker-input" data-target="#eDate" runat="server" ID="txtEDate"></asp:TextBox>
                                        <div class="input-group-append" data-target="#eDate" data-toggle="datetimepicker">
                                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <label class="mt-3"></label>
                                <div class="form-group">
                                    <asp:Button ID="Button1" class="btn btn-primary" runat="server" Text="Show" />
                                </div>
                            </div>
                        </div>
                        <!-- /.col -->
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                            <ContentTemplate>
                                <asp:SqlDataSource ID="SqlDataSource3" runat="server" ConnectionString="<%$ ConnectionStrings:ACCOUNT19ConnectionString %>" SelectCommand="SELECT * FROM [AcStat] WHERE (([PartyID] = @PartyID) AND ([Date] &gt;= @Date) AND ([Date] &lt;= @Date2))">
                                    <SelectParameters>
                                        <asp:ControlParameter ControlID="ddlPartyID" Name="PartyID" PropertyName="SelectedValue" Type="Int32" />
                                        <asp:ControlParameter ControlID="txtSDate" Name="Date" PropertyName="Text" Type="DateTime" />
                                        <asp:ControlParameter ControlID="txtEDate" Name="Date2" PropertyName="Text" Type="DateTime" />
                                    </SelectParameters>
                                </asp:SqlDataSource>
                            </ContentTemplate>
                            <Triggers>
                                <asp:AsyncPostBackTrigger ControlID="Button1" EventName="Click" />
                            </Triggers>
                        </asp:UpdatePanel>
                    </div>
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
            $('#sDate').datetimepicker({
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
