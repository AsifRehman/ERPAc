var Sale = function () {

    var settings = {
        // basic information section
        switchPreBal: $('#switchPreBal')

    };

    var saveItem = function (item) {
        $.ajax({
            url: base_url + 'index.php/item/save',
            type: 'POST',
            data: item,
            // processData : false,
            // contentType : false,
            dataType: 'JSON',
            success: function (data) {

                if (data.error === 'true') {
                    alert('An internal error occured while saving voucher. Please try again.');
                } else {
                    alert('Item saved successfully.');
                    $('#ItemAddModel').modal('hide');
                    fetchItems();
                }
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    var fetchlot = function (itemId, design = '', type = '') {
        // $(".loader").show();
        $.ajax({
            url: base_url + 'index.php/outwardvoucher/fetchbale',
            type: 'POST',
            data: { 'item_id': itemId, 'design': design, 'type': type },
            dataType: 'JSON',
            success: function (data) {
                // console.log(data);
                if (data == 'false') {
                    alert('No Lot is Found For this Item or Design');
                    $('#item_dropdown').val('').trigger('liszt:updated');
                    $('#itemid_dropdown').val('').trigger('liszt:updated');
                    $('#design_dropdown').val('').trigger('liszt:updated');
                    $('.laststockLocation_tabledisp').addClass('disp');
                    $("table .rate_tbody1 tr").remove();
                    $('.laststockLocation_tabledisp1').removeClass('disp');
                    $('#laststockLocation_table1 tbody tr').remove();
                } else {
                    $("table .rate_tbody1 tr").remove();
                    if (design == '') {
                        $('#design_dropdown').val('').trigger('liszt:updated');

                    }
                    // $('#design_dropdown').val('').trigger('liszt:updated');
                    $('.laststockLocation_tabledisp').removeClass('disp');
                    $('#laststockLocation_table tbody tr').remove();
                    $('.laststockLocation_tabledisp1').removeClass('disp');
                    $('#laststockLocation_table1 tbody tr').remove();
                    $.each(data, function (index, elem) {
                        appendToTable_last_stockLocation(elem.location, elem.lot_number, elem.design, elem.bales, elem.stqty, elem.gid, elem.cd1, elem.bundle);
                    });
                    // $('#txtlot').trigger('change');
                    $('#txtlot').val('').trigger('liszt:updated');
                }

                // if(design != '') {
                //     // $('#txtlot').select2('open'); 
                // }
                $(".loader").hide();
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
                $(".loader").hide();
            }
        });
    }
    var pre_check = function (location, lot_number, itemId, design, design_id, type, mpb, bale, meter11) {
        // $(".loader").show();
        $.ajax({
            url: base_url + 'index.php/outwardvoucher/fetchbale',
            type: 'POST',
            data: { 'item_id': itemId, 'design': design, 'type': type },
            dataType: 'JSON',
            success: function (data) {
                // console.log(data);
                if (data == 'false') {
                    $('.laststockLocation_tabledisp').removeClass('disp');
                    $('#laststockLocation_table tbody tr').remove();
                    $('.laststockLocation_tabledisp1').removeClass('disp');
                    $('#laststockLocation_table1 tbody tr').remove();
                    appendToTable_last_stockLocation('', lot_number, design_id, bale, meter11, location, design, mpb);
                } else {
                    $('.laststockLocation_tabledisp').removeClass('disp');
                    $('#laststockLocation_table tbody tr').remove();
                    $('.laststockLocation_tabledisp1').removeClass('disp');
                    $('#laststockLocation_table1 tbody tr').remove();
                    var check = 0;
                    $.each(data, function (index, elem) {
                        var meter = 0;
                        var bales = 0;

                        if (elem.gid == location && elem.lot_number == lot_number && design == elem.cd1 && parseFloat(elem.bundle) == parseFloat(mpb)) {
                            check = 1;
                            meter = parseFloat(elem.stqty) + parseFloat(meter11);
                            bales = parseFloat(elem.bales) + parseFloat(bale);
                        } else {
                            meter = parseFloat(elem.stqty);
                            bales = parseFloat(elem.bales);
                        }
                        appendToTable_last_stockLocation(elem.location, elem.lot_number, elem.design, bales, meter, elem.gid, elem.cd1, elem.bundle);
                    });
                    // alert(check);
                    if (check == 0) {
                        appendToTable_last_stockLocation('', lot_number, design_id, bale, meter11, location, design, mpb);
                    }
                    // $('#txtlot').trigger('change');
                    // $('#txtlot').val('').trigger('liszt:updated');
                }

                // if(design != '') {
                //     // $('#txtlot').select2('open'); 
                // }
                // $(".loader").hide();
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
                $(".loader").hide();
            }
        });
    }
    var fetchlotdesign = function (itemId, design, type) {
        // $(".loader").show();

        $.ajax({
            url: base_url + 'index.php/outwardvoucher/fetchlotdesign',
            type: 'POST',
            data: { 'item_id': itemId, 'design': design, 'type': type },
            dataType: 'JSON',
            async: false,
            success: function (data) {
                console.log(data);
                if (data == 'false') {
                    alert('No Lot is Found For this Item or Design');
                    $('#item_dropdown').val('').trigger('liszt:updated');
                    $('#itemid_dropdown').val('').trigger('liszt:updated');
                    $('#design_dropdown').val('').trigger('liszt:updated');

                } else {

                    $('.laststockLocation_tabledisp1').removeClass('disp');
                    $('#laststockLocation_table1 tbody tr').remove();

                    $.each(data, function (index, elem) {
                        var opt = "<option value='" + elem.lot_number + "'>" + elem.lot_number + "</option>";
                        $(opt).appendTo('#txtlot');
                        $('#txtlot').trigger('liszt:updated');
                    });
                }
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
                // $(".loader").hide();
            }
        });
    }

    var last_stockLocatons1 = function (lot) {
        // console.log('hello');
        $("table .rate_tbody1 tr").remove();
        $.ajax({

            url: base_url + 'index.php/saleorder/lot_location',
            type: 'POST',
            data: { 'item_id': lot, 'company_id': $('#type_dropdown').val(), 'etype': $('#design_dropdown').val(), 'item_id2': $('#item_dropdown').val() },
            dataType: 'JSON',

            success: function (data) {
                console.log(data);
                //reset table
                if (data === 'false') {
                    $('.laststockLocation_tabledisp1').addClass('disp');
                } else {
                    $('.laststockLocation_tabledisp1').removeClass('disp');
                    // $(".rate_tbody").html("");
                    $('#txtmpb').val(data[0]['bundle']);
                    $.each(data, function (index, elem) {
                        appendToTable_last_stockLocation1(elem.lot_number, elem.carton, elem.bundle, elem.qty);

                    });
                }

            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }
    var appendToTable_last_stockLocation1 = function (location, carton, mpr, qty) {


        var row = "<tr>" +
            "<td class='location numeric' data-title='location' > " + location + "</td>" +
            "<td class='location numeric' data-title='location' > " + carton + "</td>" +
            "<td class='location numeric' data-title='location' > " + mpr + "</td>" +
            "<td class='qty numeric' data-title='location' > " + parseFloat(qty).toFixed(2) + "</td>" +
            // "<td class='qty numeric' data-title='qty'> "+ qty +"</td>" +
            "</tr>";

        $(row).appendTo('#laststockLocation_table1');

    }

    var fetchprate = function (lot, bale, item_id, colorid) {
        // alert('hello');
        $.ajax({
            url: base_url + 'index.php/outwardvoucher/fetchprate',
            type: 'POST',
            data: { 'lot': lot, 'bale': bale, 'item_id': item_id, 'colorid': colorid, 'mpt': $('#metperthaan_dropdown').val(), 'etype': 'purchase' },
            // processData : false,
            // contentType : false,
            dataType: 'JSON',
            success: function (data) {
                console.log(data);
                if (data == 'false') {
                    $('#lprate').val(0);
                }
                else {
                    console.log(data[0]['rate']);
                    $('#lprate').val(data[0]['rate']);
                    // console.log(a);
                }
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }
    var fetchwarehosue = function () {
        $.ajax({

            url: base_url + 'index.php/setting_configuration/fetchAll',
            type: 'POST',
            data: { 'company_id': $('#cid').val() },
            dataType: 'JSON',
            success: function (data) {
                console.log(data)
                $('#dept_dropdown').val(data[0]['fabriclocation']).trigger('liszt:updated');
                $('#type_dropdown').val(data[0]['freshcloth']).trigger('liszt:updated');;

            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }
    var fetchcolor = function (lot, item_id) {
        // alert('heloo');
        $.ajax({
            url: base_url + 'index.php/outwardvoucher/fetchcolor',
            type: 'POST',
            data: { 'lot': lot, 'item_id': item_id, 'etype': 'purchase' },
            // processData : false,
            // contentType : false,
            dataType: 'JSON',
            success: function (data) {
                console.log(data);
                if (data == 'false') {
                    alert('No Design is Found For this item!!');
                    $('#design_dropdown').empty();
                    $('#design_dropdown').append('<option value="" disabled >Choose design</option>')
                    $('#design_dropdown').val('').trigger('liszt:updated');


                } else {
                    $('#design_dropdown').empty();
                    $('#design_dropdown').append('<option value="" disabled >Choose Design</option>')
                    $('#design_dropdown').val('').trigger('liszt:updated');

                    $.each(data, function (index, elem) {
                        // console.log('hello');
                        var opt = "<option value='" + elem.design + "'  >" + elem.name + "</option>";
                        $(opt).appendTo('#design_dropdown');
                    });
                    $('#design_dropdown').val(data[0]['design']).trigger('liszt:updated');;
                    // $('#itemid_dropdown').select2('val',data[0]['item_id']);
                }
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }
    var fetchitems = function (lot, bale) {
        $.ajax({
            url: base_url + 'index.php/outwardvoucher/fetchitems',
            type: 'POST',
            data: { 'lot': lot, 'bale': bale, 'etype': 'purchase' },
            // processData : false,
            // contentType : false,
            dataType: 'JSON',
            success: function (data) {
                // console.log(data);
                // var data=data[0];
                if (data == 'false') {
                    alert('No Item is Found!!');
                    $('#itemid_dropdown').empty();
                    $('#item_dropdown').empty();
                    $('#item_dropdown').append('<option value="" disabled >Choose Item</option>')
                    $('#itemid_dropdown').append('<option value="" disabled >Choose Item</option>')

                    $('#itemid_dropdown').val('').trigger('liszt:updated');
                    $('#item_dropdown').val('').trigger('liszt:updated');


                } else {
                    $('#itemid_dropdown').empty();
                    $('#item_dropdown').empty();
                    $('#item_dropdown').append('<option value="" disabled >Choose Item</option>')
                    $('#itemid_dropdown').append('<option value="" disabled >Choose Item</option>')
                    $('#itemid_dropdown').val('').trigger('liszt:updated');
                    $('#item_dropdown').val('').trigger('liszt:updated');
                    $.each(data, function (index, elem) {
                        var opt1 = "<option value='" + elem.item_id + "' data-discount='" + elem.item_pur_discount + "' data-srate='" + elem.srate + "' data-bid='" + elem.bid + "' data-barcode='" + elem.item_barcode + "'  data-size='" + elem.size + "' data-uom_item='" + elem.uom + "' data-prate='" + elem.cost_price + "' data-grweight='" + elem.cost_price + "' data-stqty='" + elem.stqty + "' data-stweight='" + elem.stweight + "' >" + elem.short_code + "</option>";
                        var opt2 = "<option value='" + elem.item_id + "' data-discount='" + elem.item_pur_discount + "' data-srate='" + elem.srate + "' data-bid='" + elem.bid + "' data-barcode='" + elem.item_barcode + "'  data-size='" + elem.size + "' data-uom_item='" + elem.uom + "' data-prate='" + elem.cost_price + "' data-grweight='" + elem.cost_price + "' data-stqty='" + elem.stqty + "' data-stweight='" + elem.stweight + "' >" + elem.item_des + "</option>";

                        $(opt1).appendTo('#itemid_dropdown');
                        $(opt2).appendTo('#item_dropdown');
                        $('#itemid_dropdown').trigger('liszt:updated')
                        $('#item_dropdown').trigger('liszt:updated')
                    });
                }
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }
    var isFieldValid = function () {
        var errorFlag = false;
        var name = $('#txtAccountName').val();   // get the current fee category name entered by the user
        var pid = 20000;      // hidden pid

        var accountNames = new Array();
        // get all branch names from the hidden list
        $("#party_dropdown11 option").each(function () {
            accountNames.push($(this).text().trim().toLowerCase());
        });

        // if both values are not equal then we are in update mode


        $.each(accountNames, function (index, elem) {

            if (name.toLowerCase() === elem.toLowerCase()) {
                $('#txtAccountName').addClass('inputerror');
                errorFlag = true;
            }
        });


        return errorFlag;
    }

    var saveAccount = function (accountObj) {
        $.ajax({
            url: base_url + 'index.php/account/save',
            type: 'POST',
            data: { 'accountDetail': accountObj },
            dataType: 'JSON',
            success: function (data) {

                if (data.error === 'false') {
                    alert('An internal error occured while saving account. Please try again.');
                } else {
                    alert('Account saved successfully.');
                    $('#AccountAddModel').modal('hide');
                    fetchAccount();
                }
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    var fetchAccount = function () {

        $.ajax({
            url: base_url + 'index.php/account/fetchAll',
            type: 'POST',
            data: { 'active': 1, 'typee': 'sale' },
            dataType: 'JSON',
            success: function (data) {
                if (data === 'false') {
                    alert('No data found');
                } else {
                    populateDataAccount(data);
                }
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    var fetchItems1 = function () {
        $.ajax({
            url: base_url + 'index.php/item/fetchAll',
            type: 'POST',
            data: { 'active': 1 },
            dataType: 'JSON',
            success: function (data) {
                if (data === 'false') {
                    alert('No data found');
                } else {
                    populateDataItem(data);
                }
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    var populateDataAccount = function (data) {
        $("#party_dropdown11").empty();

        $.each(data, function (index, elem) {

            var opt = "<option value='" + elem.pid + "' data-credit='" + elem.balance + "' data-city='" + elem.city + "' data-address='" + elem.address + "' data-cityarea='" + elem.cityarea + "' data-mobile='" + elem.mobile + "' >" + elem.name + "</option>";
            $(opt).appendTo('#party_dropdown11');
        });
    }

    var last_5_srate = function (crit, etype) {
        $("table .rate_tbody tr").remove();
        $.ajax({

            url: base_url + 'index.php/purchase/last_5_srate',
            type: 'POST',
            data: { 'crit': crit, 'company_id': $('#cid').val(), 'etype': etype, 'date': $('#current_date').val() },
            dataType: 'JSON',

            success: function (data) {
                console.log(data);
                //reset table
                if (data === 'false') {
                    $('.l5ratesdisp').addClass('disp');
                } else {
                    $('.l5ratesdisp').removeClass('disp');
                    // $(".rate_tbody").html("");

                    $.each(data, function (index, elem) {

                        // if ((index == 0 && elem.etype == 'purchase')) {
                        //     // alert(elem.rate);
                        //     $('#txtBarcodePRate').val(elem.rate)
                        // }
                        if (elem.etype == 'sale') {
                            appendToTable_last_rate(elem.vrnoa, elem.vrdate, elem.rate, elem.qty);

                        }
                    });
                }

            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    var lastPrate = function (itemId) {
        $.ajax({

            url: base_url + 'index.php/purchase/lastPRate',
            type: 'POST',
            async: false,
            data: { 'company_id': $('#cid').val(), 'item_id': itemId, 'date': $('#current_date').val() },
            dataType: 'JSON',

            success: function (data) {
                // console.log(data);
                //reset table
                if (data !== 'false') {

                    $('#txtBarcodePRate').val(data[0]['prate']);
                }
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    // var last_stockLocatons = function (item_id) {
    //     $("table .rate_tbody tr").remove();
    //     $.ajax({

    //         url: base_url + 'index.php/saleorder/last_stockLocatons',
    //         type: 'POST',
    //         data: {'item_id': item_id, 'company_id': $('#cid').val(), 'etype': 'sale'},
    //         dataType: 'JSON',
    //         async : false,

    //         success: function (data) {
    //             // console.log(data);
    //             //reset table
    //             if (data === 'false') {
    //                 $('.laststockLocation_tabledisp').addClass('disp');
    //             } else {
    //                 $('.laststockLocation_tabledisp').removeClass('disp');
    //                 // $(".rate_tbody").html("");

    //                 $.each(data, function (index, elem) {
    //                     appendToTable_last_stockLocation(elem.location, elem.qty);

    //                 });
    //             }

    //         }, error: function (xhr, status, error) {
    //             console.log(xhr.responseText);
    //         }
    //     });
    // }
    var ret = function (e) {
        if (e === '' || e === null) return 'noval';
        else return e;
    }
    var last_stockLocatons = function (item_id, bale, colorid, lotno) {
        bale = ret(bale);
        colorid = ret(colorid);
        item_id = ret(item_id);
        lotno = ret(lotno);
        $("table .rate_tbody tr").remove();
        $("table .rate_tbody1 tr").remove();
        $.ajax({
            url: base_url + 'index.php/saleorder/last_stockLocatons',
            type: 'POST',
            data: { 'item_id': item_id, 'company_id': $('#cid').val(), 'etype': 'sale', 'bale': bale, 'colorid': colorid, 'lotno': lotno },
            dataType: 'JSON',
            success: function (data) {
                console.log(data);
                if (data === 'false') {
                    $('.laststockLocation_tabledisp').addClass('disp');
                } else if (data == 'nobal') {
                    alert('This bale does not exist...');
                    $('.laststockLocation_tabledisp').addClass('disp');
                } else {
                    $('.laststockLocation_tabledisp').removeClass('disp');
                    // $(".rate_tbody").html("");

                    $.each(data, function (index, elem) {
                        appendToTable_last_stockLocation(elem.location, elem.thaan, elem.qty, elem.mpt, elem.bale, elem.color, elem.thaan);
                        calculatethaan(Math.abs(elem.thaan), elem.qty);
                    });
                }

            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    // var appendToTable_last_stockLocation = function (location, qty) {


    //     var row = "<tr>" +
    //         "<td class='location numeric' data-title='location' > " + location + "</td>" +
    //         "<td class='qty numeric' data-title='qty'> " + qty + "</td>" +
    //         "</tr>";

    //     $(row).appendTo('#laststockLocation_table');

    // }
    var calculatethaan = function (thaan, qty) {
        var _tmeter = getNumText($('.tmeter'));
        var _thaan = getNumText($('.thaantotal'));
        var tempQty = parseFloat(_tmeter) + parseFloat(qty);
        $('.tmeter').text(tempQty);
        var tempThaan = parseFloat(_thaan) + parseFloat(thaan);
        $('.thaantotal').text(tempThaan);
    }
    var appendToTable_last_stockLocation = function (location, lot, design, bale, qty, gid, cd, mpb) {
        // alert(lot)
        var row = "<tr>" +
            "<td class='location numeric' data-title='location' colspan='4' > <b>" + location + "</b></td>" +
            "</tr>" +
            "<tr>" +
            /*"<td class='location numeric' data-title='location' > "+ location +"</td>" +*/
            "<td class='lot ' data-title='location' > " + lot + "</td>" +
            "<td class='design' data-title='qty'> " + design + "</td>" +
            "<td class='bale numeric' data-title='bale'> " + parseFloat(bale).toFixed(2) + "</td>" +
            "<td class='mpb numeric' data-title='bale'> " + parseFloat(mpb).toFixed(2) + "</td>" +
            "<td class='meter numeric' data-title='qty'> " + parseFloat(qty).toFixed(2) + "</td>" +
            "<td class='gid hide' data-title='qty'> " + gid + "</td>" +
            "<td class='design1 hide' data-title='qty'> " + cd + "</td>" +

            // "<td class='qty numeric hide' data-title='color'> "+ qty*thaan +"</td>" +

            "</tr>";

        $(row).appendTo('#laststockLocation_table');

    }

    var getcrit = function () {
        var crit = '';
        var accid = $('#party_dropdown11').select2('val');
        var item_id = $('#itemid_dropdown').select2('val');
        // alert(accid);
        // alert(item_id);

        if (item_id !== null) {
            crit += 'AND i.item_id in (' + item_id + ') ';
        }
        if (accid !== null) {
            crit += 'AND m.party_id in (' + accid + ') '
        }
        crit += 'AND m.stid <>0 ';

        return crit;
    }

    var appendToTable_last_rate = function (vrnoa, vrdate, rate, stock) {


        var row = "<tr>" +
            "<td class='vr# numeric' data-title='Vr#' > " + vrnoa + "</td>" +
            "<td class='vrdatee' data-title='Date'> " + vrdate + "</td>" +
            "<td class='rate numeric' data-title='Rate'> " + rate + "</td>" +
            "<td class='stock numeric' data-title='stock'> " + stock + "</td>" +
            "</tr>";

        $(row).appendTo('#lastrate_table');
    }

    var fetchlastprate = function (vrnoa, vrdate, item_id) {
        // $("table .rate_tbody tr").remove();
        var status;
        $.ajax({

            url: base_url + 'index.php/purchase/fetchlastprate',
            type: 'POST',
            async: false,
            data: {
                'vrnoa': vrnoa,
                'vrdate': vrdate,
                'item_id': item_id,
                'company_id': $('#cid').val(),
                'etype': 'purchase'
            },
            dataType: 'JSON',

            success: function (data) {
                console.log(data);
                // alert(data[0]['prate']);
                //reset table
                if (data === 'false') {
                    $('#txtBarcodePRate').val(0);
                    status = false;

                } else {
                    $('#txtBarcodePRate').val(data[0]['rate']);
                    status = true;
                }


            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
        return status;
    }

    var populateDataItem = function (data) {
        $("#itemid_dropdown").empty();
        $("#item_dropdown").empty();

        $.each(data, function (index, elem) {
            var opt = "<option value='" + elem.item_id + "' data-size='" + elem.size + "' data-prate= '" + elem.cost_price + "' data-srate='" + elem.srate + "' data-uom_item= '" + elem.uom + "' data-grweight= '" + elem.grweight + "' data-stqty='" + elem.stqty + "' data-stweight='" + elem.stweight + "' data-barcode='" + elem.item_barcode + "' >" + elem.item_des + "</option>";
            // var = "<option value='" + $item['item_id'] + "' data-uom_item="<?php echo $item['uom']; ?>" data-prate="<?php echo $item['cost_price']; ?>" data-grweight="<?php echo $item['grweight']; ?>"><?php echo $item['item_des']; ?></option>";
            $(opt).appendTo('#item_dropdown');
            var opt1 = "<option value='" + elem.item_id + "' data-size='" + elem.size + "' data-prate= '" + elem.cost_price + "' data-srate='" + elem.srate + "' data-uom_item= '" + elem.uom + "' data-grweight= '" + elem.grweight + "' data-stqty='" + elem.stqty + "' data-stweight='" + elem.stweight + "' data-barcode='" + elem.item_barcode + "' >" + elem.item_id + "</option>";
            // var = "<option value='" + $item['item_id'] + "' data-uom_item="<?php echo $item['uom']; ?>" data-prate="<?php echo $item['cost_price']; ?>" data-grweight="<?php echo $item['grweight']; ?>"><?php echo $item['item_des']; ?></option>";
            $(opt1).appendTo('#itemid_dropdown');

        });
    }

    var getSaveObjectAccount = function () {

        var obj = {
            pid: '20000',
            active: '1',
            name: $.trim($('#txtAccountName').val()),
            level3: $.trim($('#txtLevel3').val()),
            dcno: $('#txtVrnoa').val(),
            etype: 'sale',
            uid: $.trim($('#uid').val()),
            company_id: $.trim($('#cid').val()),
        };

        return obj;
    }

    var getSaveObjectItem = function () {

        var itemObj = {
            item_id: 20000,
            active: '1',
            open_date: $.trim($('#current_date').val()),
            catid: $('#category_dropdown').val(),
            subcatid: $.trim($('#subcategory_dropdown').val()),
            bid: $.trim($('#brand_dropdown').val()),
            barcode: $.trim($('#txtBarcode').val()),
            description: $.trim($('#txtItemName').val()),
            item_des: $.trim($('#txtItemName').val()),
            cost_price: $.trim($('#txtPurPrice').val()),
            srate: $.trim($('#txtSalePrice').val()),
            uid: $.trim($('#uid').val()),
            company_id: $.trim($('#cid').val()),
            uom: $.trim($('#uom_dropdown').val()),
            short_code: '',
        };
        return itemObj;
    }

    var populateDataGodowns = function (data) {
        $("#dept_dropdown").empty();
        $.each(data, function (index, elem) {
            var opt1 = "<option value=" + elem.did + ">" + elem.name + "</option>";
            $(opt1).appendTo('#dept_dropdown');
        });
    }

    var fetchGodowns = function () {
        $.ajax({
            url: base_url + 'index.php/department/fetchAllDepartments',
            type: 'POST',
            dataType: 'JSON',
            success: function (data) {
                if (data === 'false') {
                    alert('No data found');
                } else {
                    populateDataGodowns(data);
                }
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    var getSaveObjectGodown = function () {
        var obj = {};
        obj.did = 20000;
        obj.name = $.trim($('#txtNameGodownAdd').val());
        obj.description = $.trim($('.page_title').val());
        return obj;
    }

    var saveGodown = function (department) {
        $.ajax({
            url: base_url + 'index.php/department/saveDepartment',
            type: 'POST',
            data: { 'department': department },
            dataType: 'JSON',
            success: function (data) {

                if (data.error === 'false') {
                    alert('An internal error occured while saving department. Please try again.');
                } else {
                    alert('Department saved successfully.');
                    $('#GodownAddModel').modal('hide');
                    fetchGodowns();
                }
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    var validateSaveGodown = function () {
        var errorFlag = false;
        var _desc = $.trim($('#txtNameGodownAdd').val());
        $('.inputerror').removeClass('inputerror');
        if (!_desc) {
            $('#txtNameGodownAdd').addClass('inputerror');
            errorFlag = true;
        }
        return errorFlag;
    }

    var validateSaveItem = function () {

        var errorFlag = false;
        // var _barcode = $('#txtBarcode').val();
        var _desc = $.trim($('#txtItemName').val());
        var cat = $.trim($('#category_dropdown').val());
        var subcat = $('#subcategory_dropdown').val();
        var brand = $.trim($('#brand_dropdown').val());
        var uom_ = $.trim($('#uom_dropdown').val());

        // remove the error class first

        $('.inputerror').removeClass('inputerror');
        if (!uom_) {
            $('#uom_dropdown').addClass('inputerror');
            errorFlag = true;
        }
        if (_desc === '' || _desc === null) {
            $('#txtItemName').addClass('inputerror');
            errorFlag = true;
        }
        if (!cat) {
            $('#category_dropdown').addClass('inputerror');
            errorFlag = true;
        }
        if (!subcat) {
            $('#subcategory_dropdown').addClass('inputerror');
            errorFlag = true;
        }
        if (!brand) {
            $('#brand_dropdown').addClass('inputerror');
            errorFlag = true;
        }

        return errorFlag;
    }

    var validateSaveAccount = function () {

        var errorFlag = false;
        var partyEl = $('#txtAccountName');
        var deptEl = $('#txtLevel3');

        // remove the error class first
        $('.inputerror').removeClass('inputerror');

        if (!partyEl.val()) {
            $('#txtAccountName').addClass('inputerror');
            errorFlag = true;
        }
        if (!deptEl.val()) {
            deptEl.addClass('inputerror');
            errorFlag = true;
        }

        return errorFlag;
    }

    var save = function (sale) {
        general.disableSave();
        $.ajax({

            url: base_url + 'index.php/outwardvoucher/save',
            type: 'POST',
            data: {
                'stockmain': JSON.stringify(sale.stockmain),
                'stockdetail': JSON.stringify(sale.stockdetail),
                'vrnoa': sale.vrnoa,
                'ledger': JSON.stringify(sale.ledger),
                'voucher_type_hidden': $('#voucher_type_hidden').val(),
                'etype': 'fogp',
                'is_hold': ($("#cbHold").is(':checked')) ? "true" : "false"
            },
            dataType: 'JSON',
            success: function (data) {

                if (data.error === 'true') {
                    alert('An internal error occured while saving voucher. Please try again.');
                } else {
                    // alert('Voucher saved successfully.');
                    // general.ShowAlert('Save');
                    var printConfirmation = confirm('Voucher saved!\nWould you like to print the invoice as well?');
                    if (printConfirmation === true) {
                        Print_Voucher(1, 'lg', '');
                        general.reloadWindow();
                        resetVoucher();

                    } else {

                        resetVoucher();
                    }
                }
                general.enableSave();
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    var Print_Voucher = function (hd, prnt, wrate) {
        if ($('.btnSave').data('printbtn') == 0) {
            alert('Sorry! you have not print rights..........');
        } else {
            var etype = 'fogp';
            var vrnoa = $('#txtVrnoa').val();
            var company_id = $('#cid').val();
            var user = $('#uname').val();
            // var hd = $('#hd').val();
            var pre_bal_print = ($(settings.switchPreBal).bootstrapSwitch('state') === true) ? '1' : '0';

            var url = base_url + 'index.php/doc/Print_Voucher/' + etype + '/' + vrnoa + '/' + company_id + '/' + '-1' + '/' + user + '/' + pre_bal_print + '/' + hd + '/' + prnt + '/' + wrate;
            // var url = base_url + 'index.php/doc/CashVocuherPrintPdf/' + etype + '/' + dcno   + '/' + companyid + '/' + '-1' + '/' + user;
            window.open(url);
        }
    }
    var fetchmiv = function (miv) {
        // alert(miv)
        $.ajax({
            url: base_url + 'index.php/outwardvoucher/fetchmiv',
            type: 'POST',
            data: { 'miv': miv, 'etype': 'fogp' },
            dataType: 'JSON',
            success: function (data) {
                console.log(data);
                if (data == 'true') {
                    alert('Miv Already Saved !!');
                    $('#txtmiv').val('');
                    $('#txtmiv').focus();
                    $('#txtmiv').addClass('inputerror');
                } else {
                    $('.inputerror').removeClass('inputerror');

                }
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }
    var fetchbilty = function (miv) {
        // alert(miv)
        $.ajax({
            url: base_url + 'index.php/outwardvoucher/fetchbilty',
            type: 'POST',
            data: { 'miv': miv, 'company_id': $('#cid').val() },
            dataType: 'JSON',
            success: function (data) {
                console.log(data);
                if (data == 'true') {
                    alert('Bilty Number Already Saved!!');
                    $('#txtInvNo').val('');
                    $('#txtInvNo').focus();
                    $('#txtInvNo').addClass('inputerror');
                } else {
                    $('.inputerror').removeClass('inputerror');

                }
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }
    var fetch = function (vrnoa) {

        $.ajax({
            url: base_url + 'index.php/outwardvoucher/fetch',
            type: 'POST',
            data: { 'vrnoa': vrnoa, 'company_id': $('#cid').val() },
            dataType: 'JSON',
            success: function (data) {

                resetFields();
                $('#txtOrderNo').val('');
                if (data === 'false') {
                    alert('No data found.');
                    $(".disabledclass").prop("disabled", true);
                } else {
                    populateData(data);
                    $(".disabledclass").prop("disabled", false);
                }

            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }
    var checkogp = function (vrnoa, check = '') {

        $.ajax({
            url: base_url + 'index.php/outwardvoucher/checkogp',
            type: 'POST',
            data: { 'vrnoa': vrnoa, 'company_id': $('#cid').val() },
            dataType: 'JSON',
            success: function (data) {
                console.log(data);
                // resetFields();
                // $('#txtOrderNo').val('');
                if (data === 'false') {
                    if (check == '2') {
                        var vrnoa = $('#txtVrnoaHidden').val();
                        if (vrnoa !== '') {
                            if (confirm('Are you sure to delete this voucher?'))
                                deleteVoucher(vrnoa);
                        }
                    } else {
                        // alert('No data found.');
                        sale.initSave();
                    }
                    // $(".disabledclass").prop("disabled", true);
                } else {
                    alert('Outward Has Been Made Posted On Fabric Sale # ' + data[0]['vrnoa'] + '.');
                    // $(".disabledclass").prop("disabled", false);
                }

            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }
    var fetchdetail = function (vrnoa) {

        $.ajax({
            url: base_url + 'index.php/outwardvoucher/fetch',
            type: 'POST',
            data: { 'vrnoa': vrnoa, 'company_id': $('#cid').val() },
            dataType: 'JSON',
            success: function (data) {

                // resetFields();
                // $('#txtOrderNo').val('');
                if (data === 'false') {
                    alert('No data found.');
                    // $(".disabledclass").prop("disabled", true);
                } else {
                    $('#sale_table tbody tr').remove();
                    $('.txtTotalThaan1').text('');
                    $('.txtTotalAmount').text('');
                    // $(".disabledclass").prop("disabled", false);
                    $.each(data, function (index, elem) {
                        appendToTable('', elem.lot_number, Math.abs(elem.bundle), elem.design, elem.dname, elem.icc, elem.tname, Math.abs(elem.carton), elem.item_name, elem.item_id, parseFloat(Math.abs(elem.meter)).toFixed(2), elem.godown_id, elem.rate);
                        calculateLowerTotal(Math.abs(elem.carton), elem.bundle, 0, Math.abs(elem.meter), 0);

                    });
                }

            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }
    var fetchReports = function (from, to, companyid, etype, uid) {


        $('.grand-total').html(0);

        if (typeof dTable != 'undefined') {
            dTable.fnDestroy();
            $('#saleRows').empty();
        }
        // alert(crit + 'akax');

        $.ajax({
            url: base_url + "index.php/outwardvoucher/fetchReportDataMain",
            data: {
                'from': from,
                'to': to,
                'company_id': companyid,
                'etype': etype,
                'uid': uid,
                'is_hold': ($("#cbSearchHold").is(':checked')) ? "true" : "false"
            },
            type: 'POST',
            dataType: 'JSON',
            beforeSend: function () {
                console.log(this.data);
            },
            complete: function () {
            },
            success: function (result) {
                $('#saleReport tbody tr').remove();


                if (result.length !== 0 || result.length !== '' || result !== '' || typeof result[index] !== 'undefined') {


                    var th;
                    var td1;
                    var grandTaxP = 0.0;
                    var grandExpP = 0.0;
                    var grandDicP = 0.0;
                    var grandTaxA = 0.0;
                    var grandExpA = 0.0;
                    var grandDicA = 0.0;
                    var grandPaid = 0.0;
                    var grandNetamont = 0.0;

                    var saleRows = $("#saleRows");

                    $.each(result, function (index, elem) {

                        //debugger

                        var obj = {};

                        obj.SERIAL = saleRows.find('tr').length + 1;

                        obj.VRNOA = "<a href='" + base_url + "index.php/outwardvoucher?vrnoa=" + elem.vrnoa + "' target='_blank' >" + elem.vrnoa + "</a>";
                        obj.V1 = elem.vrnoa;
                        obj.MIV = (elem.miv) ? elem.miv : "-";
                        // obj.VRNOA = elem.vrnoa;
                        obj.VRDATE = (elem.vrdate) ? elem.vrdate.substring(0, 10) : "-";
                        obj.PARTYNAME = (elem.party_name) ? elem.party_name : "Not Available";
                        obj.REMARKS = (elem.remarks) ? elem.remarks : "-";
                        obj.BILTY = (elem.bilty_no) ? elem.bilty_no : "-";
                        obj.TAXP = (elem.taxpercent) ? parseFloat(elem.taxpercent).toFixed(0) : "0";
                        obj.EXPP = (elem.exppercent) ? parseFloat(elem.exppercent).toFixed(0) : "0";
                        obj.DICP = (elem.discp) ? parseFloat(elem.discp).toFixed(0) : "0";
                        obj.TAXA = (elem.tax) ? parseFloat(elem.tax).toFixed(0) : "0";
                        obj.EXPA = (elem.expense) ? parseFloat(elem.expense).toFixed(0) : "0";
                        obj.DICA = (elem.discount) ? parseFloat(elem.discount).toFixed(0) : "0";
                        obj.PAID = (elem.paid) ? parseFloat(elem.paid).toFixed(0) : "0";
                        obj.NETAMOUNT = (elem.namount) ? parseFloat(elem.namount).toFixed(0) : "0";


                        grandTaxP += parseFloat(obj.TAXP);
                        grandExpP += parseFloat(obj.EXPP);
                        grandDicP += parseFloat(obj.DICP);
                        grandTaxA += parseFloat(obj.TAXA);
                        grandExpA += parseFloat(obj.EXPA);
                        grandDicA += parseFloat(obj.DICA);
                        grandPaid += parseFloat(obj.PAID);
                        grandNetamont += parseFloat(obj.NETAMOUNT);

                        // console.log(grandTaxP);


                        // Add the item of the new voucher
                        td1 = $("#voucher-item-template").html();
                        var source = td1;
                        var template = Handlebars.compile(source);
                        var html = template(obj);

                        saleRows.append(html);

                        if (index === (result.length - 1)) {

                            // add the last one's sum
                            var source = $("#voucher-sum-template").html();
                            var template = Handlebars.compile(source);
                            var html = template({
                                VOUCHER_SUM: Math.abs(grandNetamont).toFixed(0),
                                VOUCHER_TAXP_SUM: Math.abs(grandTaxP).toFixed(0),
                                VOUCHER_EXP_SUM: Math.abs(grandExpP).toFixed(0),
                                VOUCHER_DISCOUNTP_SUM: Math.abs(grandDicP).toFixed(0),
                                VOUCHER_TAXA_SUM: Math.abs(grandTaxA).toFixed(0),
                                VOUCHER_EXPA_SUM: Math.abs(grandExpA).toFixed(0),
                                VOUCHER_DISCOUNTA_SUM: Math.abs(grandDicA).toFixed(0),
                                VOUCHER_PAID_SUM: Math.abs(grandPaid).toFixed(0),
                                'TOTAL_HEAD': 'GRAND TOTAL'
                            });

                            saleRows.append(html);
                        }
                        ;


                    });
                    // $('.grand-total').html(grandTotal);

                } else {
                    alert('No result Found');
                }


                // bindGrid();
            },

            error: function (result) {
                alert("Error:" + result);
            }
        });
    }

    var populateData = function (data) {

        $('#txtVrno').val(data[0]['vrno']);
        $('#txtVrnoHidden').val(data[0]['vrno']);
        $('#txtVrnoaHidden').val(data[0]['vrnoa']);
        $('#current_date').datepicker('update', data[0]['vrdate'].substr(0, 10));
        $('#hiddenDateTime').val(data[0]['date_time']);
        $('#party_dropdown11').val(data[0]['party_id']).trigger('liszt:updated');
        $('#party_dropdown11').trigger('change');
        $('#txtInvNo').val(data[0]['inv_no']);
        $('#txtmiv').val(data[0]['miv']);
        $('#due_date').datepicker('update', data[0]['due_date'].substr(0, 10));
        $('#receivers_list').val(data[0]['received_by']);
        $('#transporter_dropdown').val(data[0]['transporter_id']).trigger('liszt:updated');;
        $('#txtRemarks').val(data[0]['remarks']);
        $('#txtNetAmount').val(parseFloat(data[0]['namount']).toFixed(0));
        $('#txtOrderNo').val(data[0]['order_no']);
        $('#txtDiscount').val(parseFloat(data[0]['discp']).toFixed(0));
        $('#txtExpense').val(parseFloat(data[0]['exppercent']).toFixed(0));
        $('#txtExpAmount').val(parseFloat(data[0]['expense']).toFixed(0));
        $('#txtTax').val(parseFloat(data[0]['taxpercent']).toFixed(0));
        $('#txtTaxAmount').val(parseFloat(data[0]['tax']).toFixed(0));
        $('#txtDiscAmount').val(parseFloat(data[0]['discount']).toFixed(0));
        $('#txtPaid').val(parseFloat(data[0]['paid']).toFixed(0));
        $('#txtFreight').val(parseFloat(data[0]['freight']).toFixed(0));
        $('#user_dropdown').val(data[0]['uid']);
        $('#dept_dropdown').val(data[0]['godown_id']).trigger('liszt:updated');;
        $('#voucher_type_hidden').val('edit');
        $('#user_dropdown').val(data[0]['uid']);
        $('#txtcustomerName').val(data[0]['customer_name']);
        $('#txtcustomerMob').val(data[0]['mobile']);
        $('#txtCashTender').val(parseFloat(data[0]['cash_tender']).toFixed());

        var isHold = data[0]['is_hold'];
        if (isHold == "1") {
            $("#cbfreight").prop("checked", true);
        }
        else {
            $("#cbfreight").prop("checked", false);
        }

        // $.each(data, function (index, elem) {
        //     // alert(elem.s_rate);
        //     appendToTable('', elem.item_name, elem.item_id, Math.abs(elem.s_qty), parseFloat(elem.discount1).toFixed(0), parseFloat(elem.damount).toFixed(0), parseFloat(elem.s_rate).toFixed(0), parseFloat(elem.s_net).toFixed(0), elem.prate);
        //     calculateLowerTotal(Math.abs(elem.s_qty), elem.s_net, elem.damount);
        //     // alert(elem.s_rate);
        // });
        $.each(data, function (index, elem) {
            // alert(elem.s_rate);
            // (srno, lot,mpb,design,bales,item_desc, item_id, amount,dept_id)
            // console.log(elem.lot_number,elem.thaan,elem.mpt,elem.colorid,elem.color,elem.bale ,elem.item_name, elem.item_id, Math.abs(elem.s_qty),Math.abs(elem.discount1),Math.abs(elem.damount), parseFloat(elem.s_rate).toFixed(0), parseFloat(elem.s_net).toFixed(0))
            appendToTable('', elem.lot_number, Math.abs(elem.bundle), elem.design, elem.dname, elem.icc, elem.tname, Math.abs(elem.carton), elem.item_name, elem.item_id, parseFloat(Math.abs(elem.meter)).toFixed(2), elem.godown_id, elem.rate);
            calculateLowerTotal(Math.abs(elem.carton), elem.bundle, 0, Math.abs(elem.meter), 0);
            // alert(elem.s_rate);
        });
    }

    // gets the max id of the voucher
    var getMaxVrno = function () {

        $.ajax({

            url: base_url + 'index.php/outwardvoucher/getMaxVrno',
            type: 'POST',
            data: { 'company_id': $('#cid').val() },
            dataType: 'JSON',
            success: function (data) {

                $('#txtVrno').val(data);
                $('#txtMaxVrnoHidden').val(data);
                $('#txtVrnoHidden').val(data);
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    var getMaxVrnoa = function () {

        $.ajax({

            url: base_url + 'index.php/outwardvoucher/getMaxVrnoa',
            type: 'POST',
            data: { 'company_id': $('#cid').val() },
            dataType: 'JSON',
            success: function (data) {

                $('#txtVrnoa').val(data);
                $('#txtMaxVrnoaHidden').val(data);
                $('#txtVrnoaHidden').val(data);
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    // var validateSingleProductAdd = function () {


    //     var errorFlag = false;
    //     var itemEl = $('#item_dropdown');
    //     var qtyEl = $('#txtQty');
    //     var rateEl = $('#txtPRate');
    //     var godownIdE1 = $('#dept_dropdown');

    //     // remove the error class first
    //     $('.inputerror').removeClass('inputerror');

    //     if (!itemEl.val()) {
    //         itemEl.addClass('inputerror');
    //         errorFlag = true;
    //     }
    //     if (!qtyEl.val()) {
    //         qtyEl.addClass('inputerror');
    //         errorFlag = true;
    //     }
    //     if (!rateEl.val()) {
    //         rateEl.addClass('inputerror');
    //         errorFlag = true;
    //     }
    //     if (godownIdE1.val() == '' || godownIdE1.val() == null ) {
    //         $('#dept_dropdown').addClass('inputerror');
    //         errorFlag = true;
    //     }

    //     return errorFlag;
    // }
    var validateSingleProductAdd = function () {


        var errorFlag = false;
        var itemEl = $('#item_dropdown');
        var thaanEl = $('#txtlot');
        var mptEl = $('#design_dropdown');
        var baleEl = $('#txtbales');
        var colorEl = $('#design_dropdown');
        var deptEl = $('#dept_dropdown');
        var qtyEl = $('#txtmpb');
        // var rateEl = $('#txtPRate');

        // remove the error class first
        $('.inputerror').removeClass('inputerror');

        if (!itemEl.val()) {
            $('#item_dropdown_chzn').addClass('inputerror');
            errorFlag = true;
        } if (!thaanEl.val()) {
            $('#txtlot_chzn').addClass('inputerror');
            errorFlag = true;
        } if (!deptEl.val()) {
            $('#dept_dropdown_chzn').addClass('inputerror');
            errorFlag = true;
        } if (!mptEl.val()) {
            $('#design_dropdown_chz').addClass('inputerror');
            errorFlag = true;
        }
        // if ( !colorEl.val() ) {
        //     $('#design_dropdown_chz').addClass('inputerror');
        //     errorFlag = true;
        // }
        if (!baleEl.val()) {
            baleEl.addClass('inputerror');
            errorFlag = true;
        }
        if (!qtyEl.val()) {
            $('#txtmpb_chz').addClass('inputerror');
            errorFlag = true;
        }


        return errorFlag;
    }

    // var appendToTable = function (srno, item_desc, item_id, qty, discp, discount, rate, amount, PRate) {
    //     // alert(PRate);
    //     var srno = $('#sale_table tbody tr').length + 1;
    //     var row = "<tr>" +
    //         "<td class='srno numeric text-left' data-title='Sr#' > " + srno + "</td>" +
    //         "<td class='item_desc' data-title='Description' data-item_id='" + item_id + "'> " + item_desc + "</td>" +
    //         "<td class='qty numeric text-right' data-title='Qty'>  " + qty + "</td>" +
    //         "<td class='rate numeric text-right' data-title='Rate' data-prate='" + PRate + "'> " + rate + "</td>" +
    //         "<td class='discp numeric text-right' data-title='Dis%'>  " + discp + "</td>" +
    //         "<td class='discount numeric text-right' data-title='Discount'>  " + discount + "</td>" +
    //         "<td class='amount numeric text-right' data-title='Amount' > " + amount + "</td>" +
    //         "<td><a href='' class='btn btn-primary btnRowEdit'><span class='fa fa-edit'></span></a> <a href='' class='btn btn-primary btnRowRemove'><span class='fa fa-trash-o'></span></a> </td>" +
    //         "</tr>";
    //     $(row).appendTo('#sale_table');
    // }
    var appendToTable = function (srno, lot, mpb, design, dname, type, tname, bales, item_desc, item_id, amount, dept_id, rate) {

        var srno = $('#sale_table tbody tr').length + 1;
        var row = "<tr>" +
            "<td class='srno numeric text-left' data-title='Sr#' > " + srno + "</td>" +
            // "<td class='bale numeric text-right' data-title='Bale' > "+ bale +"</td>" +
            "<td class='item_desc' data-title='Description' data-item_id='" + item_id + "' > " + item_desc + "</td>" +
            "<td class='design numeric text-right' data-colorid='" + design + "' data-title='Color'>  " + dname + "</td>" +
            "<td class='type numeric text-right' data-typeid='" + type + "' data-title='Color'>  " + tname + "</td>" +
            "<td class='lot numeric text-right' data-title='Bale' > " + lot + "</td>" +
            "<td class='bales numeric text-right' data-title='Qty'>  " + bales + "</td>" +
            "<td class='mpb numeric text-right' data-title='Meter/Thaan'>  " + mpb + "</td>" +
            "<td class='amount numeric text-right' data-title='Qty'>  " + amount + "</td>" +
            "<td class='dept hide numeric text-right' data-title='Qty'>  " + dept_id + "</td>" +
            "<td class='rate hide numeric text-right' data-title='Qty'>  " + rate + "</td>" +
            "<td><a href='' class='btn btn-primary btnRowEdit' style='width:50px !important'><span class='fa fa-edit'></span></a> <a href='' class='btn btn-primary btnRowRemove' style='width:50px !important' ><span class='fa fa-trash-o'></span></a></td>" + //<a href='' class='btn btn-primary btnRowPrint'><span class='fa fa-print'></span></a>
            "</tr>";
        $(row).appendTo('#sale_table');
    }

    var getPartyId = function (partyName) {
        var pid = "";
        $('#party_dropdown11 option').each(function () {
            if ($(this).text().trim().toLowerCase() == partyName) pid = $(this).val();
        });
        return pid;
    }


    var getSaveObject = function () {

        var ledgers = [];
        var stockmain = {};
        var stockdetail = [];

        stockmain.vrno = $('#txtVrnoHidden').val();
        stockmain.vrnoa = $('#txtVrnoaHidden').val();
        stockmain.vrdate = $('#current_date').val();
        stockmain.party_id = $('#party_dropdown11').val();
        stockmain.bilty_no = $('#txtInvNo').val();
        stockmain.bilty_date = $('#due_date').val();
        stockmain.received_by = $('#receivers_list').val();
        stockmain.transporter_id = ($('#transporter_dropdown').val() != null) ? $('#transporter_dropdown').val() : "";
        stockmain.remarks = $('#txtRemarks').val();
        stockmain.etype = 'fogp';
        stockmain.namount = $('#txtNetAmount').val();
        stockmain.order_vrno = $('#txtOrderNo').val();
        stockmain.discp = $('#txtDiscount').val();
        stockmain.discount = $('#txtDiscAmount').val();
        stockmain.expense = $('#txtExpAmount').val();
        stockmain.exppercent = $('#txtExpense').val();
        stockmain.tax = $('#txtTaxAmount').val();
        stockmain.taxpercent = $('#txtTax').val();
        stockmain.paid = $('#txtPaid').val();
        stockmain.customer_name = $('#txtcustomerName').val();
        stockmain.mobile = $('#txtcustomerMob').val();
        stockmain.freight = $('#txtFreight').val();
        stockmain.uid = $('#uid').val();
        stockmain.company_id = $('#cid').val();
        stockmain.miv = $('#txtmiv').val();
        stockmain.fn_id = $('#fid').val();
        stockmain.item_discount = $('.txtTotalDiscount').val();
        stockmain.cash_tender = $('#txtCashTender').val();

        stockmain.is_hold = ($("#cbfreight").is(':checked')) ? "1" : "0";


        // stockmain.freight_option = $('input[name="freightRadio"]:checked').val();


        var prd = '';
        var totaldiscount = 0;
        $('#sale_table').find('tbody tr').each(function (index, elem) {
            var sd = {};
            sd.stid = '';
            sd.lot_number = $.trim($(elem).find('td.lot').text());
            sd.item_id = $.trim($(elem).find('td.item_desc').data('item_id'));
            sd.icc = $.trim($(elem).find('td.type').data('typeid'));
            sd.godown_id = $.trim($(elem).find('td.dept').text());
            sd.type = 'outward';

            sd.qty = "-" + $.trim($(elem).find('td.bales').text());

            // sd.qty = "-" + $.trim($(elem).find('td.qty').text());

            // sd.weight = $.trim($(elem).find('td.weight').text());
            sd.carton = "-" + $.trim($(elem).find('td.bales').text());
            sd.bundle = $.trim($(elem).find('td.mpb').text());
            // sd.meter = $.trim($(elem).find('td.mpb').text());
            sd.meter = "-" + $.trim($(elem).find('td.amount').text());
            sd.design = $.trim($(elem).find('td.design').data('colorid'));
            sd.rate = $.trim($(elem).find('td.rate').text());

            // sd.netamount = ;
            // prd += $.trim($(elem).find('td.item_desc').text()) + ', ' + Math.abs(sd.qty) + '@' + sd.netamount / Math.abs(sd.qty) + ', ';
            // totaldiscount +=totaldiscount+(Math.abs(sd.qty)*sd.damount);
            stockdetail.push(sd);
        });

        ///////////////////////////////////////////////////////////////
        //// for over all voucher
        ///////////////////////////////////////////////////////////////

        // var pledger = {};
        // pledger.pledid = '';
        // pledger.pid = $('#party_dropdown11').val();
        // pledger.description = prd + ', ' + $('#txtRemarks').val();
        // pledger.date = $('#current_date').val();
        // pledger.credit = 0;
        // pledger.debit = $('#txtNetAmount').val();
        // pledger.dcno = $('#txtVrnoaHidden').val();
        // pledger.invoice = $('#txtVrnoaHidden').val();
        // pledger.etype = 'sale';
        // pledger.pid_key = $('#saleid').val();
        // pledger.uid = $('#uid').val();
        // pledger.company_id = $('#cid').val();
        // pledger.isFinal = 0;
        // ledgers.push(pledger);

        // var pur_amount = parseFloat($('.txtTotalAmount').text()) + totaldiscount;//parseFloat($('.txtTotalDiscount').text());
        // var pledger = {};
        // pledger.pledid = '';
        // pledger.pid = $('#saleid').val();
        // pledger.description = $('#party_dropdown11').find('option:selected').text() + ' ' + $('#txtRemarks').val();
        // pledger.date = $('#current_date').val();
        // pledger.credit = pur_amount;
        // pledger.debit = 0;
        // pledger.dcno = $('#txtVrnoaHidden').val();
        // pledger.invoice = $('#txtInvNo').val();
        // pledger.etype = 'sale';
        // pledger.pid_key = $('#party_dropdown11').val();
        // pledger.uid = $('#uid').val();
        // pledger.company_id = $('#cid').val();
        // pledger.isFinal = 0;
        // ledgers.push(pledger);

        // ///////////////////////////////////////////////////////////////
        // //// for Discount
        // ///////////////////////////////////////////////////////////////
        // if ($('.txtTotalDiscount').text() != 0) {
        //     pledger = undefined;
        //     var pledger = {};
        //     pledger.etype = 'sale';
        //     pledger.description = $('#party_dropdown11 option:selected').text() + '. ' + $('#txtRemarks').val();
        //     // pledger.description = 'sale Head';
        //     pledger.dcno = $('#txtVrnoaHidden').val();
        //     pledger.invoice = $('#txtVrnoaHidden').val();
        //     pledger.pid = $('#itemdiscountid').val();
        //     pledger.date = $('#current_date').val();
        //     pledger.credit = 0;
        //     pledger.debit = totaldiscount;//$('.txtTotalDiscount').text();
        //     pledger.isFinal = 0;
        //     pledger.uid = $('#uid').val();
        //     pledger.company_id = $('#cid').val();
        //     pledger.pid_key = $('#party_dropdown11').val();

        //     ledgers.push(pledger);
        // }

        // if ($('#txtDiscAmount').val() != 0) {
        //     pledger = undefined;
        //     var pledger = {};
        //     pledger.etype = 'sale';
        //     pledger.description = $('#party_dropdown11 option:selected').text() + '. ' + $('#txtRemarks').val();
        //     // pledger.description = 'sale Head';
        //     pledger.dcno = $('#txtVrnoaHidden').val();
        //     pledger.invoice = $('#txtVrnoaHidden').val();
        //     pledger.pid = $('#discountid').val();
        //     pledger.date = $('#current_date').val();
        //     pledger.credit = 0;
        //     pledger.debit = $('#txtDiscAmount').val();
        //     pledger.isFinal = 0;
        //     pledger.uid = $('#uid').val();
        //     pledger.company_id = $('#cid').val();
        //     pledger.pid_key = $('#party_dropdown11').val();

        //     ledgers.push(pledger);
        // }

        // if ($('#txtTaxAmount').val() != 0) {
        //     pledger = undefined;
        //     var pledger = {};
        //     pledger.etype = 'sale';
        //     pledger.description = $('#party_dropdown11 option:selected').text() + '. ' + $('#txtRemarks').val();
        //     // pledger.description = 'sale Head';
        //     pledger.dcno = $('#txtVrnoaHidden').val();
        //     pledger.invoice = $('#txtVrnoaHidden').val();
        //     pledger.pid = $('#taxid').val();
        //     pledger.date = $('#current_date').val();
        //     pledger.credit = $('#txtTaxAmount').val();
        //     pledger.debit = 0;
        //     pledger.isFinal = 0;
        //     pledger.uid = $('#uid').val();
        //     pledger.company_id = $('#cid').val();
        //     pledger.pid_key = $('#party_dropdown11').val();
        //     ledgers.push(pledger);
        // }

        // if ($('#txtExpAmount').val() != 0) {
        //     pledger = undefined;
        //     var pledger = {};
        //     pledger.etype = 'sale';
        //     pledger.description = $('#party_dropdown11 option:selected').text() + '. Service Charges. ' + $('#txtRemarks').val();
        //     // pledger.description = 'sale Head';
        //     pledger.dcno = $('#txtVrnoaHidden').val();
        //     pledger.invoice = $('#txtVrnoaHidden').val();
        //     pledger.pid = $('#expenseid').val();
        //     pledger.date = $('#current_date').val();
        //     pledger.credit = $('#txtExpAmount').val();
        //     pledger.debit = 0;
        //     pledger.isFinal = 0;
        //     pledger.uid = $('#uid').val();
        //     pledger.company_id = $('#cid').val();
        //     pledger.pid_key = $('#party_dropdown11').val();
        //     ledgers.push(pledger);
        // }

        if ($('#txtFreight').val() != 0) {
            pledger = undefined;
            var pledger = {};
            pledger.etype = 'fogp';
            pledger.description = $('#party_dropdown11 option:selected').text() + '. Freight Charges'
            // pledger.description = 'sale Head';
            pledger.dcno = $('#txtVrnoaHidden').val();
            pledger.invoice = $('#txtVrnoaHidden').val();
            pledger.pid = $('#transporter_dropdown option:selected').data('tpid');
            pledger.date = $('#current_date').val();
            pledger.credit = $('#txtFreight').val();
            pledger.debit = 0;
            pledger.isFinal = 0;
            pledger.uid = $('#uid').val();
            pledger.company_id = $('#cid').val();
            pledger.fn_id = $('#fid').val();
            pledger.pid_key = $('#freightid').val();;
            ledgers.push(pledger);

            pledger = undefined;
            var pledger = {};
            pledger.etype = 'fogp';
            pledger.description = 'Freight Charges';
            // pledger.description = 'sale Head';
            pledger.dcno = $('#txtVrnoaHidden').val();
            pledger.invoice = $('#txtVrnoaHidden').val();
            pledger.pid = $('#freightid').val();;
            pledger.date = $('#current_date').val();
            pledger.credit = 0;
            pledger.debit = $('#txtFreight').val();;
            pledger.isFinal = 0;
            pledger.uid = $('#uid').val();
            pledger.fn_id = $('#fid').val();
            pledger.company_id = $('#cid').val();
            pledger.pid_key = $('#transporter_dropdown option:selected').data('tpid');
            ledgers.push(pledger);
        }

        // if ($('#txtPaid').val() != 0) {
        //     pledger = undefined;
        //     var pledger = {};
        //     pledger.etype = 'sale';
        //     pledger.description = $('#party_dropdown11 option:selected').text() + '. ' + $('#txtRemarks').val();
        //     // pledger.description = 'sale Head';
        //     pledger.dcno = $('#txtVrnoaHidden').val();
        //     pledger.invoice = $('#txtVrnoaHidden').val();
        //     pledger.pid = $('#cashid').val();
        //     pledger.date = $('#current_date').val();
        //     pledger.credit = 0;
        //     pledger.debit = $('#txtPaid').val();
        //     pledger.isFinal = 0;
        //     pledger.uid = $('#uid').val();
        //     pledger.company_id = $('#cid').val();
        //     pledger.pid_key = $('#party_dropdown11').val();
        //     ledgers.push(pledger);

        //     pledger = undefined;
        //     var pledger = {};
        //     pledger.etype = 'sale';
        //     pledger.description = 'Cash Paid  ' + $('#txtRemarks').val();
        //     // pledger.description = 'sale Head';
        //     pledger.dcno = $('#txtVrnoaHidden').val();
        //     pledger.invoice = $('#txtVrnoaHidden').val();
        //     pledger.pid = $('#party_dropdown11').val();
        //     pledger.date = $('#current_date').val();
        //     pledger.credit = $('#txtPaid').val();
        //     pledger.debit = 0;
        //     pledger.isFinal = 0;
        //     pledger.uid = $('#uid').val();
        //     pledger.company_id = $('#cid').val();
        //     pledger.pid_key = $('#cashid').val();
        //     ledgers.push(pledger);

        // }
        var data = {};
        data.stockmain = stockmain;
        data.stockdetail = stockdetail;
        data.ledger = ledgers;
        data.vrnoa = $('#txtVrnoaHidden').val();

        return data;
    }

    // checks for the empty fields
    var validateSave = function () {

        var errorFlag = false;
        var partyEl = $('#party_dropdown11');
        var deptEl = $('#dept_dropdown');
        var transEl = $('#transporter_dropdown');
        var curEl = $('#current_date');
        var mivEl = $('#txtmiv');

        // remove the error class first
        $('.inputerror').removeClass('inputerror');

        if (!deptEl.val()) {
            deptEl.addClass('inputerror');
            errorFlag = true;
        }
        if (!partyEl.val()) {

            $('#party_dropdown11_chz').addClass('inputerror');
            errorFlag = true;
        }
        var freight = getNumVal($('#txtFreight'));
        if (freight != 0) {
            if (!transEl.val()) {
                $('#transporter_dropdown_chz').addClass('inputerror');
                errorFlag = true;
            }
        }
        if (!curEl.val()) {

            curEl.addClass('inputerror');
            errorFlag = true;
        }
        if (!mivEl.val()) {

            mivEl.addClass('inputerror');
            errorFlag = true;
        }
        return errorFlag;
    }

    // checks for the empty fields
    var validateSearch = function () {

        var errorFlag = false;
        var fromEl = $('#from_date');
        var toEl = $('#to_date');

        // remove the error class first
        $('.inputerror').removeClass('inputerror');

        if (!toEl.val()) {
            toEl.addClass('inputerror');
            errorFlag = true;
        }
        if (!fromEl.val()) {
            $('#from_date').addClass('inputerror');
            errorFlag = true;
        }


        return errorFlag;
    }

    var deleteVoucher = function (vrnoa) {
        general.disableSave();
        $.ajax({
            url: base_url + 'index.php/outwardvoucher/delete',
            type: 'POST',
            data: {
                'vrnoa': vrnoa,
                'etype': 'fogp',
                'company_id': $('#cid').val(),
                'is_hold': ($("#cbHold").is(':checked')) ? "true" : "false"
            },
            dataType: 'JSON',
            success: function (data) {

                if (data === 'false') {
                    alert('No data found');
                } else {
                    alert('Voucher deleted successfully');
                    general.reloadWindow();
                }
                general.enableSave();
            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    // var calculateLowerTotal = function (qty, amount, discount) {

    //     var _qty = getNumText($('.txtTotalQty'));
    //     var _discount = getNumText($('.txtTotalDiscount'));
    //     var _amnt = getNumText($('.txtTotalAmount'));

    //     var _discp = getNumVal($('#txtDiscount'));
    //     var _disc = getNumVal($('#txtDiscAmount'));
    //     var _tax = getNumVal($('#txtTax'));
    //     var _taxamount = getNumVal($('#txtTaxAmount'));
    //     var _expense = getNumVal($('#txtExpAmount'));
    //     var _exppercent = getNumVal($('#txtExpense'));
    //     var _amountless = getNumVal($('#txtPaid'));
    //     var _freight = getNumVal($('#txtFreight'));
    //     var cashTender = getNumVal($('#txtCashTender'));


    //     var tempQty = parseFloat(_qty) + parseFloat(qty);
    //     $('.txtTotalQty').text(tempQty);

    //     var tempdiscount = parseFloat(parseFloat(_discount) + parseFloat(discount)).toFixed(0);
    //     $('.txtTotalDiscount').text(tempdiscount);

    //     var tempAmnt = (parseFloat(_amnt) + parseFloat(amount)).toFixed(0);
    //     // $('#txtTotalAmount').text(tempAmnt);
    //     $('.txtTotalAmount').text(tempAmnt);

    //     var net = (parseFloat(tempAmnt) - parseFloat(_disc) + parseFloat(_taxamount) + parseFloat(_expense) + parseFloat(_freight)).toFixed(0);
    //     $('#txtNetAmount').val(parseFloat(net).toFixed(0));

    //     var balance = parseFloat(cashTender) - parseFloat(net);
    //     $('#txtBalance').val(parseFloat(balance).toFixed());

    // }
    var calculateLowerTotal = function (thaan, mpt, qty, amount, discount) {

        var _qty = getNumText($('.txtTotalQty'));
        var _discount = getNumText($('.txtTotalDiscount'));
        var _thaan = getNumText($('.txtTotalThaan1'));
        var _mpt = getNumText($('.txtTotalMPT'));
        var _amnt = getNumText($('.txtTotalAmount'));
        var _discp = getNumVal($('#txtDiscount'));
        var _disc = getNumVal($('#txtDiscAmount'));
        var _tax = getNumVal($('#txtTax'));
        var _taxamount = getNumVal($('#txtTaxAmount'));
        var _expense = getNumVal($('#txtExpAmount'));
        var _exppercent = getNumVal($('#txtExpense'));
        var _amountless = getNumVal($('#txtPaid'));
        var _freight = getNumVal($('#txtFreight'));

        var tempQty = parseFloat(_qty) + parseFloat(qty);
        $('.txtTotalQty').text(tempQty);

        var tempThaan = parseFloat(_thaan) + parseFloat(thaan);
        $('.txtTotalThaan1').text(tempThaan);

        var tempmpt = parseFloat(_mpt) + parseFloat(mpt);
        $('.txtTotalMPT').text(tempmpt);

        var tempdiscount = parseFloat(parseFloat(_discount) + parseFloat(discount)).toFixed(0);
        $('.txtTotalDiscount').text(tempdiscount);

        var tempAmnt = (parseFloat(_amnt) + parseFloat(amount)).toFixed(0);
        // $('#txtTotalAmount').text(tempAmnt);
        $('.txtTotalAmount').text(tempAmnt);

        var net = (parseFloat(tempAmnt) - parseFloat(_disc) + parseFloat(_freight) + parseFloat(_taxamount) + parseFloat(_expense)).toFixed(0);
        $('#txtNetAmount').val(net);

    }

    var getNumText = function (el) {
        return isNaN(parseFloat(el.text())) ? 0 : parseFloat(el.text());
    }

    var getNumVal = function (el) {
        return isNaN(parseFloat(el.val())) ? 0 : parseFloat(el.val());
    }

    var calculateUpperSum = function () {

        var _qty = getNumVal($('#txtQty'));
        var discount = getNumVal($('#txtDiscount1_tbl'));
        var _disc = getNumVal($('#txtDiscp'));
        var _prate = getNumVal($('#txtPRate'));
        //var discount = 0;

        // if (_prate !== 0 && _disc !== 0) {
        //     var discount = _prate * _disc / 100;
        //     $('#txtDiscount1_tbl').val(parseFloat(discount).toFixed(0));
        // } else {
        //     $('#txtDiscount1_tbl').val('0');
        // }

        //var _tempAmnt = ((parseFloat(_prate) * parseFloat(_qty)) - parseFloat(_discount)).toFixed(0);
        var _tempAmnt = (((parseFloat(_prate) - parseFloat(discount)) * parseFloat(_qty))).toFixed(2);
        $('#txtAmount').val(_tempAmnt);
    }

    var fetchThroughPO = function (po) {

        $.ajax({

            url: base_url + 'index.php/saleorder/fetch',
            type: 'POST',
            data: { 'vrnoa': po, 'etype': 'sale_order', 'company_id': $('#cid').val() },
            dataType: 'JSON',
            success: function (data) {

                resetFields();
                if (data === 'false') {
                    alert('No data found.');
                } else {
                    populatePOData(data);
                    console.log(data);
                }

            }, error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    var populatePOData = function (data) {

        // $('#current_date').datepicker('update', data[0]['vrdate'].substr(0, 10));
        $('#party_dropdown11').val(data[0]['party_id']).trigger('liszt:updated');;
        $('#party_dropdown11').trigger('change');
        $('#txtInvNo').val(data[0]['inv_no']);
        // $('#due_date').datepicker('update', data[0]['due_date'].substr(0, 10));
        $('#receivers_list').val(data[0]['received_by']);
        $('#transporter_dropdown').val(data[0]['transporter_id']).trigger('liszt:updated');;
        $('#txtRemarks').val(data[0]['remarks']);
        $('#txtNetAmount').val(data[0]['namount']);
        // $('#txtOrderNo').val(data[0]['ordno']);

        $('#txtDiscount').val(data[0]['discp']);
        $('#txtExpense').val(data[0]['exppercent']);
        $('#txtExpAmount').val(data[0]['expense']);
        $('#txtTax').val(data[0]['taxpercent']);
        $('#txtTaxAmount').val(data[0]['tax']);
        $('#txtDiscAmount').val(data[0]['discount']);
        $('#user_dropdown').val(data[0]['uid']);
        $('#txtPaid').val(data[0]['paid']);

        $('#dept_dropdown').val(data[0]['godown_id']).trigger('liszt:updated');;
        $('#voucher_type_hidden').val('edit');
        $('#user_dropdown').val(data[0]['uid']);
        // $.each(data, function(index, elem) {
        // 	appendToTable('', elem.item_name, elem.item_id, elem.qty,elem.discp1,elem.discount1, elem.rate, elem.amount);
        // 	calculateLowerTotal(elem.qty, elem.amount, elem.discount1);
        // });
        $.each(data, function (index, elem) {
            //alert(elem.item_name);
            appendToTable('', elem.item_name, elem.item_id, Math.abs(elem.s_qty), Math.abs(elem.discount1), Math.abs(elem.damount), elem.s_rate, elem.s_net, elem.rate);
            calculateLowerTotal(Math.abs(elem.s_qty), elem.s_net, elem.damount);
        });

        $('a[href="#Main"]').click();
    }
    var resetVoucher = function () {
        getMaxVrnoa();
        getMaxVrno();
        resetFields();
    }
    var resetFields = function () {

        $('#current_date').datepicker('update', new Date());
        $('#party_dropdown11').val('').trigger('liszt:updated');
        $('#partyid_dropdown').val('').trigger('liszt:updated');
        $('#txtInvNo').val('');
        $('#due_date').datepicker('update', new Date());
        $('#receivers_list').val('');
        $('#transporter_dropdown').val('').trigger('liszt:updated');
        $('#txtRemarks').val('');
        $('#txtFreight').val('');
        $('#txtNetAmount').val('');
        $('#txtDiscount').text('');
        $('#txtExpense').text('');
        $('#txtExpAmount').text('');
        $('#txtmiv').val('');
        $('#txtTax').text('');
        $('#txtTaxAmount').text('');
        $('#txtDiscAmount').text('');
        $('.txtTotalThaan1').text('');
        $('#txtTotalAmount').text('');
        $('#txtTotalQty').val('');
        $('#txtTotalWeight').val('');
        // $('#dept_dropdown').val('').trigger('liszt:updated');
        $('#voucher_type_hidden').val('new');
        $('table tbody tr').remove();
        $('.txtTotalQty').text('');
        $('.txtTotalDiscount').text('');
        $('.txtTotalDiscp').text('');
        $('.txtTotalRate').text('');
        $('.txtTotalAmount').text('');
        $('.txtTotalThaan').text('');
        $('.txtTotalMPT').text('');
    }

    var validatestock = function (location, bale, design, lot, meter, mpb) {

        var chk = false;
        $('#laststockLocation_table').find('tbody tr').each(function (index, elem) {
            var _gid = $.trim($(elem).find('td.gid').text());
            var _meter = getNumText($(elem).find('td.meter'));
            var _design = $.trim($(elem).find('td.design1').text());
            var _bale = getNumText($(elem).find('td.bale'));
            var _mpb = getNumText($(elem).find('td.mpb'));
            var _lot = getNumText($(elem).find('td.lot'));

            if (_gid == location && _design == design && _lot == lot && mpb == _mpb) {
                // console.log(lot);
                if (parseFloat(bale) > parseFloat(_bale) || parseFloat(meter) > parseFloat(_meter)) {
                    // console.log(meter)
                    chk = true;
                }
            }
        });

        return chk;
    }
    var appendmpb = function (location, bale, design, lot, meter) {

        $('#laststockLocation_table').find('tbody tr').each(function (index, elem) {
            var _gid = $.trim($(elem).find('td.gid').text());
            var _meter = getNumText($(elem).find('td.meter'));
            var mpb = getNumText($(elem).find('td.mpb'));
            var _design = $.trim($(elem).find('td.design1').text());
            var _bale = getNumText($(elem).find('td.bale'));
            var _lot = getNumText($(elem).find('td.lot'));

            if (_gid == location && _design == design && _lot == lot) {
                console.log(mpb)
                var append = "<option value='" + mpb + "'>" + mpb + "</option>";
                $(append).appendTo('#txtmpb');

            }
        });
        $('#txtmpb').val('').trigger('liszt:updated');


    }
    return {

        init: function () {
            this.bindUI();
            // this.bindModalPartyGrid();
            this.bindModalItemGrid();
            // $('.select2').chosen();
            $('.chosen').chosen();
        },

        bindUI: function () {

            var self = this;

            $('#GodownAddModel').on('shown.bs.modal', function (e) {
                $('#txtNameGodownAdd').focus();
            });

            $('.btnSaveMGodown').on('click', function (e) {
                if ($('.btnSave').data('savegodownbtn') == 0) {
                    alert('Sorry! you have not save departments rights..........');
                } else {
                    e.preventDefault();
                    self.initSaveGodown();
                }
            });
            fetchwarehosue();
            $('#partyid_dropdown').on('change', function (e) {
                $('.partydisp').removeClass('disp');
                var party_id = $(this).val();
                $('#party_dropdown11').val(party_id).trigger('liszt:updated');
                $('#party_dropdown11').trigger('change');
                // var current_date = $('#current_date').val();
                // var city = $(this).find('option:selected').data('city');
                // var address = $(this).find('option:selected').data('address');
                // var area = $(this).find('option:selected').data('cityarea');
                // var contact = $(this).find('option:selected').data('mobile');
                // var credit = $(this).find('option:selected').data('credit');
                // var vendor = $(this).find('option:selected').text();
                // var br = ' <br/> ';
                // $('#party_p').html(' Balance is ' + credit + '  <br/>' + city + '<br/>' + address + ' ' + area + '<br/> ' + contact);
                // var partyName = $('#party_dropdown11').find('option:selected').text();
                // if(partyName.toUpperCase() == 'CASH'){

                //     $('#txtPaid').val('');
                //     $("#txtPaid").attr("readonly", true);
                // }
                // else{
                //     $("#txtPaid").attr("readonly", false);
                // }
            });

            $('#party_dropdown11').on('change', function () {

                $('.partydisp').removeClass('disp');
                var pid = $(this).val();
                $('#partyid_dropdown').val(pid).trigger('liszt:updated');;
                var current_date = $('#current_date').val();
                var city = $(this).find('option:selected').data('city');
                var address = $(this).find('option:selected').data('address');
                var area = $(this).find('option:selected').data('cityarea');
                var contact = $(this).find('option:selected').data('mobile');
                var credit = $(this).find('option:selected').data('credit');
                var vendor = $(this).find('option:selected').text();
                var br = ' <br/> ';
                $('#party_p').html(' Balance is ' + credit + '  <br/>' + city + '<br/>' + address + ' ' + area + '<br/> ' + contact);
                var partyName = $('#party_dropdown11').find('option:selected').text();
                if (partyName.toUpperCase() == 'CASH') {

                    $('#txtPaid').val('');
                    $("#txtPaid").attr("readonly", true);
                }
                else {
                    $("#txtPaid").attr("readonly", false);
                }
            });

            $('.btnResetMGodown').on('click', function () {

                $('#txtNameGodownAdd').val('');
            });

            $('#txtLevel3').on('change', function () {

                var level3 = $('#txtLevel3').val();
                $('#txtselectedLevel1').text('');
                $('#txtselectedLevel2').text('');
                if (level3 !== "" && level3 !== null) {
                    // alert('enter' + $(this).find('option:selected').data('level2') );
                    $('#txtselectedLevel2').text(' ' + $(this).find('option:selected').data('level2'));
                    $('#txtselectedLevel1').text(' ' + $(this).find('option:selected').data('level1'));
                }
            });
            // $('#txtLevel3').select2();
            $('.btnSaveM').on('click', function (e) {
                if ($('.btnSave').data('saveaccountbtn') == 0) {
                    alert('Sorry! you have not save accounts rights..........');
                } else {
                    e.preventDefault();
                    self.initSaveAccount();
                }
            });

            $('.btnResetM').on('click', function () {

                $('#txtAccountName').val('');
                $('#txtselectedLevel2').text('');
                $('#txtselectedLevel1').text('');
                $('#txtLevel3').val('').trigger('liszt:updated');
            });

            $('.btnprintGatepassOutward').on('click', function (e) {
                e.preventDefault();
                window.open(base_url + 'application/views/reportprints/gatepassOutward.php', "Quotation Voucher", 'width=1000, height=842');
            });

            $('.btnprintsmall').on('click', function (e) {
                e.preventDefault();
                window.open(base_url + 'application/views/reportprints/salethermalprint.php', "Quotation Voucher", 'width=1000, height=842');
            });

            $('#AccountAddModel').on('shown.bs.modal', function (e) {
                $('#txtAccountName').focus();
            });

            shortcut.add("F3", function () {
                $('#AccountAddModel').modal('show');
            });

            shortcut.add("F4", function () {
                $('#txtCashTender').focus();
            });

            $('.btnSaveMItem').on('click', function (e) {
                if ($('.btnSave').data('saveitembtn') == 0) {
                    alert('Sorry! you have not save item rights..........');
                } else {
                    e.preventDefault();
                    self.initSaveItem();
                }
            });

            $('.btnResetMItem').on('click', function () {

                $('#txtItemName').val('');
                $('#category_dropdown').val('').trigger('liszt:updated');
                $('#subcategory_dropdown').val('').trigger('liszt:updated');
                $('#brand_dropdown').val('').trigger('liszt:updated');
                $('#txtBarcode').val('');
            });

            $('#ItemAddModel').on('shown.bs.modal', function (e) {
                $('#txtItemName').focus();
            });
            $("#search").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#saleReport tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
            shortcut.add("F7", function () {
                $('#ItemAddModel').modal('show');
            });

            $("#switchPreBal").bootstrapSwitch('offText', 'No');
            $("#switchPreBal").bootstrapSwitch('onText', 'Yes');
            $('#voucher_type_hidden').val('new');

            $('body').on('click', '.modal-lookup .populateAccount', function (e) {
                e.preventDefault();
                var party_id = $(this).closest('tr').find('input[name=hfModalPartyId]').val();
                $("#party_dropdown11").val(party_id).trigger('liszt:updated');;
                $('#party-lookup').modal('hide');
            });


            $('.modal-lookup .populateItem').on('click', function () {
                // alert('dfsfsdf');
                var item_id = $(this).closest('tr').find('input[name=hfModalitemId]').val();
                $("#item_dropdown").val(item_id).trigger('liszt:updated');; //set the value
                $("#itemid_dropdown").val(item_id).trigger('liszt:updated');;
                $('#txtQty').focus();
            });

            $('#voucher_type_hidden').val('new');

            $('#txtVrnoa').on('change', function () {
                fetch($(this).val());
            });
            $('#txtvrdetail').on('change', function () {
                fetchdetail($(this).val())
            })
            // $('.btnSave').get()[0].click();
            // $('.btnSave1').get()[0].click();
            // $('.btnSave').on('click',function(e){
            // $('.btnSave').get()[0].click();
            // })
            $('.btnSave').on('click', function (e) {
                if ($('#voucher_type_hidden').val() == 'edit' && $('.btnSave').data('updatebtn') == 0) {
                    alert('Sorry! you have not update rights..........');
                } else if ($('#voucher_type_hidden').val() == 'new' && $('.btnSave').data('insertbtn') == 0) {
                    alert('Sorry! you have not insert rights..........');
                } else {
                    e.preventDefault();
                    checkogp($("#txtmiv").val())
                    // self.initSave();
                }
            });

            $('.btnSave1').on('click', function (e) {

                if ($('#voucher_type_hidden').val() == 'edit' && $('.btnSave').data('updatebtn') == 0) {
                    alert('Sorry! you have not update rights..........');
                } else if ($('#voucher_type_hidden').val() == 'new' && $('.btnSave').data('insertbtn') == 0) {
                    alert('Sorry! you have not insert rights..........');
                } else {
                    e.preventDefault();
                    checkogp($("#txtmiv").val())

                    // self.initSave();
                }
            });
            $('#txtmiv').on('change', function (e) {
                e.preventDefault();
                fetchmiv($(this).val());
            })
            $('#txtInvNo').on('change', function (e) {
                e.preventDefault();
                fetchbilty($(this).val());
            })
            $('#btnSearch').on('click', function (e) {
                e.preventDefault();
                var error = validateSearch();
                var from = $('#from_date').val();
                var to = $('#to_date').val();
                var companyid = $('#cid').val();
                var etype = 'fogp';
                var uid = $('#uid').val();

                if (!error) {
                    fetchReports(from, to, companyid, etype, uid);
                } else {
                    alert('Correct the errors...');
                }
            });

            $('.btnPrint').on('click', function (e) {
                e.preventDefault();
                Print_Voucher(1, 'lg', '');
            });

            $('.btnprint_sm').on('click', function (e) {
                e.preventDefault();
                //Print_Voucher(1, 'sm', '');
                Print_Voucher(1, 'lg', '');
            });

            $('.btnprint_sm_withOutHeader').on('click', function (e) {
                e.preventDefault();
                Print_Voucher(0, 'sm');
            });

            $('.btnprint_sm_rate').on('click', function (e) {
                e.preventDefault();

                Print_Voucher(1, 'sm', 'wrate');
            });

            $('.btnprint_sm_withOutHeader_rate').on('click', function (e) {
                e.preventDefault();
                Print_Voucher(0, 'sm', 'wrate');
            });

            $('.btnReset').on('click', function (e) {
                e.preventDefault();
                self.resetVoucher();
            });

            $('.btnDelete').on('click', function (e) {
                if ($('#voucher_type_hidden').val() == 'edit' && $('.btnSave').data('deletebtn') == 0) {
                    alert('Sorry! you have not delete rights..........');
                } else {

                    // alert($('#voucher_type_hidden').val() +' - '+ $('.btnSave').data('deletebtn') );
                    e.preventDefault();
                    checkogp($('#txtmiv').val(), 2)
                }

            });

            $('.btnDelete1').on('click', function (e) {
                if ($('#voucher_type_hidden').val() == 'edit' && $('.btnSave').data('deletebtn') == 0) {
                    alert('Sorry! you have not delete rights..........');
                } else {

                    // alert($('#voucher_type_hidden').val() +' - '+ $('.btnSave').data('deletebtn') );
                    e.preventDefault();
                    var vrnoa = $('#txtVrnoaHidden').val();
                    checkogp($('#txtmiv').val(), 2)
                }

            });
            $('#txtlot').on('keypress', function (e) {
                if (e.keyCode === 13) {
                    console.log('key')
                    e.preventDefault();
                    $('#txtbales').focus();
                    // last_stockLocatons1($(this).val());

                    // fetchbale($(this).val());
                }
            });

            $('#txtOrderNo').on('keypress', function (e) {
                if (e.keyCode === 13) {
                    if ($(this).val() != '') {
                        e.preventDefault();
                        fetchThroughPO($(this).val());
                    }
                }
            });
            $('#txtvrdetail').on('keypress', function (e) {
                if (e.keyCode === 13) {
                    if ($(this).val() != '') {
                        e.preventDefault();
                        fetchdetail($(this).val());
                    }
                }
            });

            $('#txtQty').on('keypress', function (e) {
                if (e.keyCode === 13) {
                    $('#btnAdd').click();
                }
            });

            $('#txtBarcodeEnter').on('keypress', function (e) {
                // if (e.keyCode === 13) {
                // 	if ($(this).val() != '') {
                // 		e.preventDefault();
                // 		// alert($(this).val());
                // 		var vrnoastid = $(this).val();
                // 		var vrnoa     = parseInt($('#txtBarcodeEnter').val().substring(0, 4));
                // 		var item_id   = parseInt($('#txtBarcodeEnter').val().substring(4, 8));
                // 		// alert(item_id);
                // 		var vrdate = $('#current_date').val();
                // 		var a = fetchlastprate(vrnoa,vrdate,item_id);
                // 		// console.log(a);
                // 		// alert(a);
                // 		$('#itemid_dropdown').select2('val',item_id);
                // 		$('#item_dropdown').select2('val',item_id);
                // 		$('#item_dropdown').trigger('change');
                // 		$('#txtQty').val(1);
                // 		calculateUpperSum();
                // 		// alert($('#txtBarcodePRate').val());
                // 		// setTimeout(function() {$('#btnAdd').trigger('click'); }, 5000);
                // 		$('#btnAdd').trigger('click');
                // 		// $('#btnAdd').trigger('click');
                // 	}
                // }
                if (e.keyCode === 13) {

                    if ($(this).val() != '') {
                        e.preventDefault();
                        var barcode = $.trim($(this).val());
                        var id = $('#itemid_dropdown').find("[data-barcode='" + barcode + "']").val();
                        if (id != "" && id != null && !(id === undefined)) {
                            $('#itemid_dropdown').val(id).trigger('liszt:updated');
                            $('#itemid_dropdown').trigger('change');
                            $('#item_dropdown').val(id).trigger('liszt:updated');;
                            $('#txtQty').val('1');
                            calculateUpperSum();
                            if ($("#txtCBInsertToGrid").prop('checked')) {

                                $('#btnAdd').trigger('click');
                            }
                            else {
                                $("#txtQty").focus();
                            }
                        }
                    }
                }
            });


            /////////////////////////////////////////////////////////////////
            /// setting calculations for the single product
            /////////////////////////////////////////////////////////////////

            $('#txtWeight').on('input', function () {
                // var _gw = getNumVal($('#txtGWeight'));
                // if (_gw!=0) {
                // var w = parseInt(parseFloat($(this).val())/parseFloat(_gw));
                // $('#txtQty').val(w);
                // }
                calculateUpperSum();

            });
            $('#thaan').on('input', function () {
                var _thaanpm = getNumVal($('#metperthaan_dropdown'));
                var thi = getNumVal($(this));
                $('#txtQty').val(_thaanpm * thi);
                calculateUpperSum();

            });
            $('#metperthaan_dropdown').on('input', function () {
                var _thaan = getNumVal($('#thaan'));
                var thipm = getNumVal($(this));
                $('#txtQty').val(_thaan * thipm);
                calculateUpperSum();

            });

            $('#itemid_dropdown').on('change', function () {
                var item_id = $(this).val();
                $('#item_dropdown').val(item_id).trigger('liszt:updated');;
                $('#item_dropdown').trigger('change');
                // var prate = $(this).find('option:selected').data('srate');
                // var grweight = $(this).find('option:selected').data('grweight');
                // var uom_item = $(this).find('option:selected').data('uom_item');
                // var stqty = $(this).find('option:selected').data('stqty');
                // var stweight = $(this).find('option:selected').data('stweight');
                // var size = $(this).find('option:selected').data('size');
                // var discount = $(this).find('option:selected').data('discount');
                // var bale = $('#bale_dropdown').val();
                // var colorid = $('#design_dropdown').val();
                // var lot=$('#txtlot').val();

                // $('#stqty_lbl').text('Item,     Uom:' + uom_item + ', Size is ' + size);
                // $('#txtSizehidden').val(size);
                // bale=bale; 
                // lot=lot; 
                // // $('#stqty_lbl').text('Item,     Qty:' + stqty + ', Weight ' + stweight + 'Size is' + size);
                // fetchcolor(lot,item_id);
                // $('#txtPRate').val(parseFloat(prate).toFixed(0));
                // $('#item_dropdown').select2('val', item_id);
                // $('#txtGWeight').val(parseFloat(grweight).toFixed());
                // $('#txtUom').val(uom_item);
                // $('#txtDiscp').val(discount);
                // var crit = getcrit();
                // // alert(crit);
                // var etypesale = 'sale';
                // var etypepurchase = 'purchase';

                // last_5_srate(etypepurchase, etypepurchase);
                // last_5_srate(etypesale, etypesale);
                // last_stockLocatons(item_id);
                // last_stockLocatons(item_id,bale,colorid,lot);
                // lastPrate(item_id);
                // $('#txtDiscp').trigger('input');
                // fetchlastprate(vrnoa,vrdate,item_id);

                // last_5_srate($('#party_dropdown11').val(), item_id);

            });

            $('#item_dropdown').on('change', function () {
                var item_id = $(this).val();
                // var lot=$('#txtlot').val();
                var prate = $(this).find('option:selected').data('srate');
                var grweight = $(this).find('option:selected').data('grweight');
                var uom_item = $(this).find('option:selected').data('uom_item');
                var stqty = $(this).find('option:selected').data('stqty');
                var stweight = $(this).find('option:selected').data('stweight');
                var size = $(this).find('option:selected').data('size');
                var discount = $(this).find('option:selected').data('discount');
                var bale = $('#bale_dropdown').val();
                var colorid = $('#design_dropdown').val();
                $('#stqty_lbl').text('Item,     Uom:' + uom_item + ', Size is ' + size);
                // $('#stqty_lbl').text('Item,     Qty:' + stqty + ', Weight ' + stweight);
                $('#txtSizehidden').val(size);
                bale = bale;
                // lot=lot; 
                // fetchcolor(item,);


                $('#txtPRate').val(parseFloat(prate).toFixed(0));
                $('#itemid_dropdown').val(item_id).trigger('liszt:updated');;
                $('#txtGWeight').val(parseFloat(grweight).toFixed(0));
                $('#txtUom').val(uom_item);
                $('#txtDiscp').val(discount);
                // alert($('#party_dropdown11').val());
                var crit = getcrit();
                // alert(crit);
                // last_5_srate(crit);
                var etypesale = 'sale';
                var etypepurchase = 'purchase';

                // last_5_srate(crit, etypepurchase);
                // last_5_srate(crit, etypesale);
                // last_stockLocatons(item_id);
                // last_stockLocatons(item_id,bale,colorid,lot);
                lastPrate(item_id);
                $('#txtDiscp').trigger('input');

                // Get Lot Detail
                var itemId = $('#item_dropdown').val();
                var type = $('#type_dropdown').val();
                fetchlot(itemId, '', type);

                // last_5_srate($('#party_dropdown11').val(), item_id);
                // calculateUpperSum();
                // $('#txtQty').focus();
            });

            /*$('#itemid_dropdown').on('change', function() {
             var item_id = $(this).val();
             var prate = $(this).find('option:selected').data('prate');
             var grweight = $(this).find('option:selected').data('grweight');
             var uom_item = $(this).find('option:selected').data('uom_item');
             // $('#txtQty').val('1');
             var stqty = $(this).find('option:selected').data('stqty');
             var stweight = $(this).find('option:selected').data('stweight');
             $('#stqty_lbl').text('Item,     Qty:' + stqty + ', Weight ' + stweight);

             $('#txtPRate').val(parseFloat(prate).toFixed(0));
             $('#item_dropdown').select2('val', item_id);
             $('#txtGWeight').val(parseFloat(grweight).toFixed());
             $('#txtUom').val(uom_item);

             // calculateUpperSum();
             // $('#txtQty').focus();
             });
             $('#item_dropdown').on('change', function() {
             var item_id = $(this).val();
             var prate = $(this).find('option:selected').data('prate');
             var grweight = $(this).find('option:selected').data('grweight');
             var uom_item = $(this).find('option:selected').data('uom_item');
             // $('#txtQty').val('1');
             var stqty = $(this).find('option:selected').data('stqty');
             var stweight = $(this).find('option:selected').data('stweight');
             $('#stqty_lbl').text('Item,     Qty:' + stqty + ', Weight ' + stweight);

             $('#txtPRate').val(parseFloat(prate).toFixed(0));
             $('#itemid_dropdown').select2('val', item_id);
             $('#txtGWeight').val(parseFloat(grweight).toFixed(0));
             $('#txtUom').val(uom_item);
             // calculateUpperSum();
             // $('#txtQty').focus();
             });*/

            /* $('#txtQty').on('input', function () {
                 calculateUpperSum();
             });*/
            $('#txtbales').on('input', function () {
                var thaan = getNumVal($('#txtmpb'));
                var thi = getNumVal($(this));
                var tmeter = parseFloat(thaan * thi).toFixed(2);
                console.log(tmeter);
                $('#txtAmount').val(tmeter)
                // calculateUpperSum();
            });
            $('#txtmpb').on('change', function () {
                var thaan = getNumVal($('#txtbales'));
                var thi = getNumVal($(this));
                var tmeter = parseFloat(thaan * thi).toFixed(2);
                $('#txtAmount').val(tmeter)
                // calculateUpperSum();
            });
            $('#txtAmount').on('input', function () {
                var thaan = getNumVal($('#txtbales'));
                var thi = getNumVal($(this));
                if (thaan !== 0) {
                    var tmeter = parseFloat(thi / thaan).toFixed(2);
                    $('#txtmpb').val(tmeter);
                } else {
                    $('#txtAmount').val('');
                    alert('Please Enter Bales First !!')
                    // calculateUpperSum();
                }
            });

            $('#txtDiscp').on('input', function () {
                var discp = $(this).val();
                var qty = $('#txtQty').val();
                var rate = $('#txtPRate').val();
                // var amount = qty * rate;
                // if (amount !== 0 && discp !== 0) {
                //     var discount = amount * discp / 100;
                //     $('#txtDiscount1_tbl').val(parseFloat(discount).toFixed(0));
                // } else {
                //     $('#txtDiscount1_tbl').val('0');
                // }

                if (rate !== 0 && discp !== 0) {
                    var discount = rate * discp / 100;
                    $('#txtDiscount1_tbl').val(parseFloat(discount).toFixed(2));
                } else {
                    $('#txtDiscount1_tbl').val('');
                }
                calculateUpperSum();
            });

            $('#txtDiscount1_tbl').on('input', function () {
                var discount = $(this).val();
                var qty = $('#txtQty').val();
                var rate = $('#txtPRate').val();
                // var amount = qty * rate;
                // if (amount !== 0 && discount !== 0) {
                //     var discp = discount * 100 / amount;
                //     $('#txtDiscp').val(parseFloat(discp).toFixed(0));
                // } else {
                //     $('#txtDiscp').val('0');
                // }
                if (rate !== 0 && discount !== 0) {
                    var discp = discount * 100 / rate;
                    $('#txtDiscp').val(parseFloat(discp).toFixed(2));
                } else {
                    $('#txtDiscp').val('');
                }
                calculateUpperSum();
            });

            $('#txtPRate').on('input', function () {
                $('#txtDiscp').trigger('input');
            });
            $("#current_date").datepicker({
                autoClose: true
            }).on('changeDate', function (ev) {

                var error1 = general.validatedate($('#current_date').val());
                if (!error1) {

                } else {
                    alert('Please Enter a Date Between' + $('#sdate').val() + ' to ' + $('#edate').val());
                }
            });
            $('#btnAdd').on('click', function (e) {
                e.preventDefault();

                var error = validateSingleProductAdd();
                var error1 = general.validatedate($('#current_date').val());
                if (!error1) {
                    if (!error) {

                        var item_desc = $('#item_dropdown').find('option:selected').text();
                        var tname = $('#type_dropdown').find('option:selected').text();
                        var type = $('#type_dropdown').val();
                        var dname = $('#design_dropdown').find('option:selected').text();
                        var item_id = $('#item_dropdown').val();
                        var qty = $('#txtQty').val();
                        var godown_name = $('#dept_dropdown').find('option:selected').text();
                        var godown_id = $('#dept_dropdown').val();
                        if (godown_name === 'Choose Warehouse') {
                            alert('Please first select godown..');
                            throw new Error('Please don\'t worry This is not an Error... at line number 2013 file name addsale.js')
                        }



                        var rate = $('#txtRate').val();
                        var weight = $('#txtWeight').val();
                        var amount = $('#txtAmount').val();
                        // var discp = $('#txtDiscp').val();
                        var bales = $.trim($('#txtbales').val());
                        bales = bales;
                        var thaan = $('#thaan').val();
                        var lot = $.trim($('#txtlot').val());
                        lot = lot;
                        var mpb = $('#txtmpb').val();
                        var design = $('#design_dropdown').val();
                        var design_name = $('#design_dropdown').find('option:selected').text();
                        var dept_id = $('#dept_dropdown').val();
                        var checkStock = validatestock(godown_id, bales, design, lot, amount, mpb);
                        // console.log(checkStock);
                        if (!checkStock) {
                            // var color = $('#design_dropdown').find('option:selected').text();
                            // var discount = $('#txtDiscount1_tbl').val();
                            // var PRate = $('#txtBarcodePRate').val();
                            // var barcode = $('#txtBarcodeEnter').val();
                            // var prate=$('#lprate').val();
                            // last_stockLocatons($('#item_dropdown').val(),$('#bale_dropdown').val(),$('#design_dropdown').val());

                            // alert(PRate);
                            var errorFlag = false;
                            $('#sale_table').find('tbody tr').each(function (index, elem) {
                                var _lot_number = $.trim($(elem).find('td.lot').text());
                                var _item_id = $.trim($(elem).find('td.item_desc').data('item_id'));
                                var _icc = $.trim($(elem).find('td.type').data('typeid'));
                                var _mpb = $.trim($(elem).find('td.mpb').text());
                                var _design = $.trim($(elem).find('td.design').data('colorid'));
                                if (_lot_number == lot && _item_id == item_id && _icc == type && _design == design && _mpb == mpb) {
                                    errorFlag = true;
                                    $(this).addClass('tablecolor');
                                    $(this).focus();
                                } else {
                                    $(this).removeClass('tablecolor');

                                }

                            });
                            if (!errorFlag) {
                                // reset the values of the annoying fields
                                $('#itemid_dropdown').val('').trigger('liszt:updated');
                                $('#item_dropdown').val('').trigger('liszt:updated');
                                $('#txtmpb').empty();
                                $('#txtmpb').val('').trigger('liszt:updated');
                                // $('#txtmpb').empty();
                                $('#txtQty').val('');
                                $('#txtmpb').val('');
                                $('#txtbales').val('');
                                $('#txtAmount').val('');
                                $('#txtGWeight').val('');
                                $('#txtDiscp').val('');
                                $('#txtDiscount1_tbl').val('');
                                $('#txtBarcodePRate').val('');
                                $('#metperthaan_dropdown').empty();
                                // $('#design_dropdown').append('<option value="" disabled >Choose Meter/Than</option>')
                                //     $('#metperthaan_dropdown').val('').trigger('liszt:updated');
                                $('#thaan').val('');
                                $('#design_dropdown').val('').trigger('liszt:updated');
                                // $('#type_dropdown').val('').trigger('liszt:updated');
                                $('#txtlot').empty();
                                $('#txtlot').append('<option value="" disabled >Choose Lot</option>')
                                //  $('#bale_dropdown').val('').trigger('liszt:updated');
                                $('#txtlot').val('').trigger('liszt:updated');
                                $('#txtBarcodeEnter').val('');
                                $('#lprate').val('');
                                // $('#purchase_table').
                                appendToTable('', lot, mpb, design, dname, type, tname, bales, item_desc, item_id, amount, dept_id, rate);
                                calculateLowerTotal(bales, mpb, 0, amount, 0);
                                $('#stqty_lbl').text('Item');
                                // $('#item_dropdown').focus();
                                // $('').focus(); 
                                $('#itemid_dropdown').trigger('liszt:activate');
                                $('#itemid_dropdown').trigger('liszt:open');
                                // $('#txtBarcodeEnter').focus();
                                // $('#itemid_dropdown').select2('open');

                                // if($('#itemid_dropdown').val()==''){
                                //     $('#itemid_dropdown').select2('open');
                                // }
                            } else {
                                alert('Please Edit The Highlighted Row in the table');
                            }
                        } else {
                            alert('Stock Not Available');
                        }

                    } else {
                        alert('Correct the errors!');
                    }
                } else {
                    alert('Please Enter a Date Between' + $('#sdate').val() + ' to ' + $('#edate').val());
                }
                //  $('.select2').select2({
                //   closeOnSelect: false
                // });

                // $('#itemid_dropdown').select2('open');                 
            });

            // when btnRowRemove is clicked
            $('#sale_table').on('click', '.btnRowRemove', function (e) {
                e.preventDefault();
                var qty = $.trim($(this).closest('tr').find('td.qty').text());
                var thaan = $.trim($(this).closest('tr').find('td.bales').text());
                var mpt = $.trim($(this).closest('tr').find('td.mpb').text());
                var amount = $.trim($(this).closest('tr').find('td.amount').text());
                var rate = $.trim($(this).closest('tr').find('td.rate').text());
                var dept = $.trim($(this).closest('tr').find('td.dept').text());
                var discount = $.trim($(this).closest('tr').find('td.discount').text());
                var discp = $.trim($(this).closest('tr').find('td.discp').text());

                calculateLowerTotal("-" + thaan, "-" + mpt, "-" + qty, "-" + amount, "-" + discount);
                $(this).closest('tr').remove();
            });
            //     $('#txtlot').on('change', function() {
            //     $('#item_dropdown option').remove();
            //     $('#itemid_dropdown option').remove();
            //     $($('#item__dropdown').html()).appendTo($('#item_dropdown'));
            //     var catid = $('#catid_dropdown').val();
            //     var subcatid = $(this).val();
            //     $('#item_dropdown option').each(function(index,elem){
            //         var cid = $(this).data('catid');
            //         var subid = $(this).data('subcatid');
            //         if(index!=0)
            //         {
            //             if(parseFloat(subcatid)===parseFloat(subid) && parseFloat(catid)===parseFloat(cid));
            //             else
            //                 $(this).remove();
            //         }       
            //     })
            // });
            $('#sale_table').on('click', '.btnRowEdit', function (e) {
                e.preventDefault();
                // getting values of the cruel row
                var item_id = $.trim($(this).closest('tr').find('td.item_desc').data('item_id'));
                var item_des = $.trim($(this).closest('tr').find('td.item_desc').text());
                var type_id = $.trim($(this).closest('tr').find('td.type').data('typeid'));
                var qty = $.trim($(this).closest('tr').find('td.qty').text());
                var rate = $.trim($(this).closest('tr').find('td.rate').text());
                var amount = $.trim($(this).closest('tr').find('td.amount').text());
                var lot = $.trim($(this).closest('tr').find('td.lot').text());
                var dept = $.trim($(this).closest('tr').find('td.dept').text());

                // $('#txtlot').val(lot);
                // $('#txtlot').trigger('change');
                var prate = $.trim($(this).closest('tr').find('td.prate').text());
                var discount = $.trim($(this).closest('tr').find('td.discount').text());
                var discp = $.trim($(this).closest('tr').find('td.discp').text());
                var colorid = $.trim($(this).closest('tr').find('td.design').data('colorid'));
                var color_des = $.trim($(this).closest('tr').find('td.design').text());
                var thaan = $.trim($(this).closest('tr').find('td.bales').text());
                var mpb = $.trim($(this).closest('tr').find('td.mpb').text());
                var bale = $.trim($(this).closest('tr').find('td.bale').text());
                // console.log(mpb)
                // $('#txtHiddenEditQty').val(qty);
                $('#txtmpb').empty();
                $('#mpb').append('<option value="" disabled >Choose Mpb</option>');
                var append = "<option value='" + mpb + "'>" + mpb + "</option>";
                $(append).appendTo('#txtmpb');
                $('#txtmpb').trigger('liszt:updated');
                $('#txtmpb').val(mpb).trigger('liszt:updated');;
                $('#txtbales').val(thaan);

                $('#txtRate').val(rate);
                $('#txtbales').val(thaan);
                $('#type_dropdown').val(type_id).trigger('liszt:updated');
                $('#itemid_dropdown').val(item_id).trigger('liszt:updated');;
                $('#item_dropdown').val(item_id).trigger('liszt:updated');;
                // $('#item_dropdown').trigger('change');
                $('#txtlot').empty();
                $('#txtlot').append('<option value="" disabled >Choose Lot</option>');
                var opt4 = "<option value='" + lot + "'  >" + lot + "</option>";
                $(opt4).appendTo('#txtlot');
                $('#txtlot').trigger('liszt:updated');
                $('#txtlot').val(lot).trigger('liszt:updated');;
                // $('#txtlot').trigger('change');
                $('#design_dropdown').val(colorid).trigger('liszt:updated');;
                // $('#txtDiscount1_tbl').val(parseFloat(discount).toFixed(0));

                // $('#txtlot').val(lot);
                // $('#txtQty').val(qty);
                // $('#txtPRate').val(rate);
                $('#txtAmount').val(parseFloat(amount).toFixed(2));
                // $('#lprate').val(prate);
                // calculateLowerTotal("-" + qty, "-" + amount, 0, "-" + discount);
                calculateLowerTotal("-" + thaan, "-" + mpb, "-" + qty, "-" + amount, "-" + discount);
                pre_check(dept, lot, item_id, colorid, color_des, type_id, mpb, thaan, amount);
                lastPrate(item_id);

                // last_stockLocatons(item_id,bale,colorid,lot);

                // now we have get all the value of the row that is being deleted. so remove that cruel row
                $(this).closest('tr').remove();	// yahoo removed
            });
            $('#bale_dropdown').on('change', function (e) {
                // alert('hello'); 
                e.preventDefault();

                var bale = $.trim($('#bale_dropdown').val());
                bale = bale;
                var lot = $.trim($('#txtlot').val());
                lot = lot;
                $('#itemid_dropdown').empty();
                $('#itemid_dropdown').append('<option value="" disabled >Choose Item ID</option>')
                $('#item_dropdown').empty();
                $('#item_dropdown').append('<option value="" disabled >Choose item_des</option>')
                $('#itemid_dropdown').val('').trigger('liszt:updated');
                $('#item_dropdown').val('').trigger('liszt:updated');

                fetchitems(lot, bale);
            });
            $('#design_dropdown').on('change', function (e) {
                e.preventDefault();
                var itemId = $('#item_dropdown').val();
                var design = $('#design_dropdown').val();
                var type = $('#type_dropdown').val();
                // bale=bale; 
                // lot=lot; 
                var item_id = $('#item_dropdown').val();
                var color = $('#design_dropdown').val();
                $('#txtlot').empty();
                $('#txtlot').append('<option value="" disabled="">Choose Lot</option>');
                // $('#txtlot').focus();
                fetchlotdesign(itemId, design, type);
                fetchlot(itemId, design, type);
            });

            $('#metperthaan_dropdown').on('change', function (e) {
                e.preventDefault();
                var lot = $('#txtlot').val();
                var bale = $('#bale_dropdown').val();
                bale = bale;
                lot = lot;
                var item_id = $('#item_dropdown').val();
                var color = $('#design_dropdown').val();
                fetchprate(lot, bale, item_id, color);
            });
            $('#txtlot').on('change', function (e) {
                e.preventDefault();
                var type = $('#type_dropdown').val();
                var godown_id = $('#dept_dropdown').val();
                var design = $('#design_dropdown').val();
                $('#txtmpb').empty();

                appendmpb(godown_id, 0, design, $(this).val(), 0);

            });
            $('#txtFreight').on('input', function () {
                calculateLowerTotal(0, 0, 0, 0, 0);
            });

            $('#txtDiscount').on('input', function () {
                var _disc = $('#txtDiscount').val();
                var _totalAmount = $('.txtTotalAmount').text();
                var _discamount = 0;
                if (_disc != 0 && _totalAmount != 0) {
                    _discamount = _totalAmount * _disc / 100;
                }
                $('#txtDiscAmount').val(_discamount);
                calculateLowerTotal(0, 0, 0, 0, 0);
            });

            $('#txtDiscAmount').on('input', function () {
                var _discamount = $('#txtDiscAmount').val();
                var _totalAmount = $('.txtTotalAmount').text();
                var _discp = 0;
                if (_discamount != 0 && _totalAmount != 0) {
                    _discp = _discamount * 100 / _totalAmount;
                }
                $('#txtDiscount').val(parseFloat(_discp).toFixed(0));
                calculateLowerTotal(0, 0, 0, 0, 0);
            });

            $('#txtExpense').on('input', function () {
                var _exppercent = $('#txtExpense').val();
                var _totalAmount = $('.txtTotalAmount').text();
                var _expamount = 0;
                if (_exppercent != 0 && _totalAmount != 0) {
                    _expamount = _totalAmount * _exppercent / 100;
                }
                $('#txtExpAmount').val(parseFloat(_expamount).toFixed(0));
                calculateLowerTotal(0, 0, 0, 0, 0);
            });

            $('#txtExpAmount').on('input', function () {
                var _expamount = $('#txtExpAmount').val();
                var _totalAmount = $('.txtTotalAmount').text();
                var _exppercent = 0;
                if (_expamount != 0 && _totalAmount != 0) {
                    _exppercent = _expamount * 100 / _totalAmount;
                }
                $('#txtExpense').val(parseFloat(_exppercent).toFixed(0));
                calculateLowerTotal(0, 0, 0, 0, 0);
            });

            $('#txtTax').on('input', function () {
                var _taxpercent = $('#txtTax').val();
                var _totalAmount = $('.txtTotalAmount').text();
                var _taxamount = 0;
                if (_taxpercent != 0 && _totalAmount != 0) {
                    _taxamount = _totalAmount * _taxpercent / 100;
                }
                $('#txtTaxAmount').val(parseFloat(_taxamount).toFixed(0));
                calculateLowerTotal(0, 0, 0, 0, 0);
            });


            $('#txtTaxAmount').on('input', function () {
                var _taxamount = $('#txtTaxAmount').val();
                var _totalAmount = $('.txtTotalAmount').text();
                var _taxpercent = 0;
                if (_taxamount != 0 && _totalAmount != 0) {
                    _taxpercent = _taxamount * 100 / _totalAmount;
                }
                $('#txtTax').val(parseFloat(_taxpercent).toFixed(0));
                calculateLowerTotal(0, 0, 0, 0, 0);
            });

            $('#txtCashTender').on('input', function () {
                calculateLowerTotal(0, 0, 0, 0, 0);
            });

            // alert('load');

            shortcut.add("F10", function () {
                $('.btnSave').get()[0].click();
            });

            shortcut.add("F1", function () {
                $('a[href="#party-lookup"]').get()[0].click();
            });

            shortcut.add("F2", function () {
                $('a[href="#item-lookup"]').get()[0].click();
            });

            shortcut.add("F9", function () {
                Print_Voucher(1, 'lg', '');
            });

            shortcut.add("F6", function () {
                $('#txtVrnoa').focus();
                // alert('focus');
            });

            shortcut.add("F5", function () {
                self.resetVoucher();
            });

            shortcut.add("F12", function () {
                $('.btnDelete').get()[0].click();
            });

            $('#txtVrnoa').on('keypress', function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    var vrnoa = $('#txtVrnoa').val();
                    if (vrnoa !== '') {
                        fetch(vrnoa);
                    }
                }
            });

            $('.btnprintHeader').on('click', function (e) {
                e.preventDefault();
                Print_Voucher(1, 'lg', '');

            });

            $('.btnprintwithOutHeader').on('click', function (e) {
                e.preventDefault();
                Print_Voucher(0, 'lg', 'amount');
            });

            sale.fetchRequestedVr();
        },

        // prepares the data to save it into the database
        initSave: function () {
            // console.log($('input[name="freightRadio"]:checked').val());
            var saveObj = getSaveObject();
            var error = validateSave();

            if (!error) {
                $('.btnSave').attr('disabled', true);
                $('.btnSave1').attr('disabled', true);
                var rowsCount = $('#sale_table').find('tbody tr').length;
                if (rowsCount > 0) {
                    save(saveObj);
                } else {
                    alert('No date found to save!');
                }
            } else {
                alert('Correct the errors...');
            }
        },

        initSaveAccount: function () {

            var saveObjAccount = partys.getSaveObjectAccount();
            var error = partys.validateSaveAccount();

            if (!error) {
                // saveAccount(saveObjAccount);
                if (!isFieldValid()) {
                    partys.saveAccount(saveObjAccount);     // saves the detail into the database
                } else {    // if fee category name is already used then show error
                    alert("Account name already used.");
                }
            } else {
                alert('Correct the errors...');
            }
        },

        initSaveItem: function () {

            var saveObjItem = getSaveObjectItem();
            var error = validateSaveItem();

            if (!error) {
                saveItem(saveObjItem);
            } else {
                alert('Correct the errors...');
            }
        },

        initSaveGodown: function () {

            var saveObjGodown = getSaveObjectGodown();
            var error = validateSaveGodown();

            if (!error) {
                saveGodown(saveObjGodown);
            } else {
                alert('Correct the errors...');
            }
        },

        fetchRequestedVr: function () {

            var vrnoa = general.getQueryStringVal('vrnoa');
            vrnoa = parseInt(vrnoa);
            $('#txtVrnoa').val(vrnoa);
            $('#txtVrnoaHidden').val(vrnoa);
            if (!isNaN(vrnoa)) {
                fetch(vrnoa);
            } else {
                getMaxVrno();
                getMaxVrnoa();
            }
        },

        // bindModalPartyGrid: function () {

        //     var dontSort = [];
        //     $('#party-lookup table thead th').each(function () {
        //         if ($(this).hasClass('no_sort')) {
        //             dontSort.push({"bSortable": false});
        //         } else {
        //             dontSort.push(null);
        //         }
        //     });
        //     sale.pdTable = $('#party-lookup table').dataTable({
        //         // "sDom": "<'row-fluid table_top_bar'<'span12'>'<'to_hide_phone'>'f'<'>r>t<'row-fluid'>",
        //         "sDom": "<'row-fluid table_top_bar'<'span12'<'to_hide_phone' f>>>t<'row-fluid control-group full top' <'span4 to_hide_tablet'l><'span8 pagination'p>>",
        //         "aaSorting": [[0, "asc"]],
        //         "bPaginate": true,
        //         "sPaginationType": "full_numbers",
        //         "bJQueryUI": false,
        //         "aoColumns": dontSort

        //     });
        //     $.extend($.fn.dataTableExt.oStdClasses, {
        //         "s`": "dataTables_wrapper form-inline"
        //     });
        // },

        bindModalItemGrid: function () {


            var dontSort = [];
            $('#item-lookup table thead th').each(function () {
                if ($(this).hasClass('no_sort')) {
                    dontSort.push({ "bSortable": false });
                } else {
                    dontSort.push(null);
                }
            });
            sale.pdTable = $('#item-lookup table').dataTable({
                // "sDom": "<'row-fluid table_top_bar'<'span12'>'<'to_hide_phone'>'f'<'>r>t<'row-fluid'>",
                "sDom": "<'row-fluid table_top_bar'<'span12'<'to_hide_phone' f>>>t<'row-fluid control-group full top' <'span4 to_hide_tablet'l><'span8 pagination'p>>",
                "aaSorting": [[0, "asc"]],
                "bPaginate": true,
                "sPaginationType": "full_numbers",
                "bJQueryUI": false,
                "aoColumns": dontSort

            });
            $.extend($.fn.dataTableExt.oStdClasses, {
                "s`": "dataTables_wrapper form-inline"
            });
        },

        // instead of reseting values reload the page because its cruel to write to much code to simply do that
        resetVoucher: function () {
            resetVoucher();
            // general.reloadWindow();
        }
    }

};

var sale = new Sale();
sale.init();