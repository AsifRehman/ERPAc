<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="Stat.aspx.cs" Inherits="ERPAc.Stat" %>

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
                                <asp:SqlDataSource ID="SqlDataSource3" runat="server" ConnectionString="<%$ ConnectionStrings:ACCOUNT19ConnectionString %>" SelectCommand="SELECT * FROM [AcStat] WHERE (([PartyID] = @PartyID) AND ([Date] &gt;= @Date) AND ([Date] &lt;= @Date2))">
                                    <SelectParameters>
                                        <asp:ControlParameter ControlID="ddlPartyID" Name="PartyID" PropertyName="SelectedValue" Type="Int32" />
                                        <asp:ControlParameter ControlID="txtSDate" Name="Date" PropertyName="Text" Type="DateTime" />
                                        <asp:ControlParameter ControlID="txtEDate" Name="Date2" PropertyName="Text" Type="DateTime" />
                                    </SelectParameters>
                                </asp:SqlDataSource>

                                <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False"
                                    DataSourceID="SqlDataSource3" style="width: 100%" CssClass="table table-bordered table-hover" OnRowDataBound="GridView1_RowDataBound">
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
