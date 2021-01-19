<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="trial.aspx.cs" Inherits="ERPAc.Trial" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Trial Balance</h1>
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
                <div class="card card-default">
                    <div class="card-header">
                        <h3 class="card-title">Account Statement Parameters</h3>

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
                                    <asp:Button ID="Button1" class="btn btn-primary" runat="server" OnClick="Button1_Click" Text="Show" />
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

                                <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False"
                                    DataSourceID="SqlDataSource2" style="width: 100%" CssClass="table table-bordered table-hover">
                                    <Columns>
                                        <asp:BoundField DataField="PartyTypeID" HeaderText="PartyTypeID" SortExpression="PartyTypeID">
                                        </asp:BoundField>
                                        <asp:BoundField DataField="PartyID" HeaderText="PartyID" SortExpression="PartyID">
                                        </asp:BoundField>
                                        <asp:BoundField DataField="PartyName" HeaderText="PartyName" SortExpression="PartyName">
                                        </asp:BoundField>
                                        <asp:BoundField DataField="op" HeaderText="op" SortExpression="op" />
                                        <asp:BoundField DataField="Dr" HeaderText="Dr" SortExpression="Dr" />
                                        <asp:BoundField DataField="Cr" HeaderText="Cr" SortExpression="Cr" />
                                        <asp:BoundField DataField="CL" HeaderText="CL" SortExpression="CL" />
                                    </Columns>
                                </asp:GridView>
                                <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:ACCOUNT19ConnectionString %>" SelectCommand="SELECT PartyName, PartyTypeID, PartyID, op, Dr, Cr, CL FROM dbo.fn_Trial(@sDt, @eDt) AS Trial_1">
                                    <SelectParameters>
                                        <asp:ControlParameter ControlID="txtSDate" Name="sDt" PropertyName="Text" Type="DateTime" />
                                        <asp:ControlParameter ControlID="txtEDate" Name="eDt" PropertyName="Text" Type="DateTime" />
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
