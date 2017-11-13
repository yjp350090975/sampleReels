window.onload = function() {
    //标题选项卡
    var aLi = $("#tab-list>div");
    var aDiv = $("#content>div");
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        aLi[i].onclick = function() {
            for (var i = 0; i < aLi.length; i++) {

                aLi[i].style.borderBottom = '2px solid #fff';
                aLi[i].style.color = "#000";
            }
            this.style.borderBottom = '2px solid #F65327';
            this.style.color = "#E4662D";
            for (var j = 0; j < aDiv.length; j++) {
                aDiv[j].style.display = "none";
            }
            aDiv[this.index].style.display = "block";
        }
    }

    // var mt = 0;
    //    var mydiv = document.getElementById("top");
    //    var mt = mydiv.offsetTop;
    //    window.onscroll = function () {
    //        var t = document.documentElement.scrollTop || document.body.scrollTop;
    //        if (t > mt) {
    //            mydiv.style.position = "fixed";
    //            mydiv.style.margin = "0";
    //            mydiv.style.top = "0";
    //        }
    //        else {
    //            mydiv.style.position = "static";
    //        }
    //    }

    // var goodsAdd = $(".goods-add-box-top");
    // var fir = goodsAdd.eq(0).offset().top;
    // var sec = goodsAdd.eq(1).offset().top;
    // var hei = goodsAdd.eq(0).outerHeight(true);
    // // for(var i = 0;i < goodsAdd.length;i++){
    // //   var mt = goodsAdd.eq(i).offset().top;
    // // }
    // console.log(hei);
    //    console.log(goodsAdd.length);
    // console.log(mt);
    //    var myadd = $(".goods-add");
    //    myadd.scroll(function () {
    // console.log(fir);
    //      // var mt = goodsAdd.eq(0).offset().top;
    //      // console.log(mt);
    //      var i = myadd.scrollTop();
    //      var cha = sec - fir - hei;
    //      console.log(cha);
    //        // var t = document.documentElement.scrollTop || document.body.scrollTop;
    //         console.log(i);
    //        if (0 < i) {
    //           goodsAdd.eq(0).css({"position":"absolute","top":0});
    //           if(cha < i){
    //              goodsAdd.eq(1).css({"position":"absolute","top":0});
    //              if((cha-hei)<i){
    //                  goodsAdd.eq(0).css({"position":"static","top":0});
    //              }
    //              }
    //        }
    //        else {
    //            goodsAdd.eq(0).css({"position":"static","top":0});
    //        }
    //    });

    //导航定位菜单
    $(".goods-add").scroll(function() {
        var items = $(".goods-add-box");
        var n = items.length;
        var menu = $("#goods-sidebar");
        var scrollTop = $(".goods-add").scrollTop();
        var windowHeight = $(window).height() ;
        var itemsTop = items.offset().top;
        
        var a_num = $(".goods-add-box-top").length;
        var a_top = $(".goods-add-box-top").outerHeight(true);
        var b_num = $(".goods-add-box-bottom").length;
        var b_top = $(".goods-add-box-bottom").outerHeight(true);
        var documentHeight = a_num*a_top+b_num*b_top;
        //console.log(top);
        var currentId = ""; //滚动条现在所在位置的item id
        items.each(function() {
            var m = $(this);
            //注意：m.offset().top代表每一个item的顶部位置
            if (scrollTop > m.offset().top - itemsTop - 100) {
                currentId = "#" + m.attr("id");
                //console.log(m.attr("id"));
                if(scrollTop > documentHeight - windowHeight){
                    currentId = "#" + $(".goods-add-box[id=item"+n+"]").attr("id");
                }
            } else {
                return false;
            }
        });

        var currentLink = menu.find(".current");
        // console.log(menu);
        // console.log(currentLink);
        // console.log(currentLink.attr("href"));
        if (currentId && currentLink.attr("href") != currentId) {
            currentLink.removeClass("current");
            menu.find("[href=" + currentId + "]").addClass("current");
        }
        // $(".goods-sidebar>ul li:last-child").click(function(){
        //     currentLink.removeClass("current");
        //     $(".goods-sidebar>ul li:last-child a").addClass("current");
        // })
    });

    //添加购买菜单
    var aDD = $(".price").find(".plus");
    var reDuce = $(".price").find(".reduce");
    //console.log(aDD.length);
    var total = $(".total");
    var purchase_times = $(".purchase-times");
    var starting_price = Number($("#starting-price").text());
    var how_much_money = $(".how-much-money").text(starting_price);
    var buyInfo = [];

    aDD.each(function() {
        $(this).click(function() {
            //console.log(index);
            var bro_num = $(this).siblings(".num");
            var bro_reduce = $(this).siblings(".reduce");
            var price_num = $(this).siblings(".price-num");
            var sellerName = $(this).parent().siblings(".p1");
            var data_goodsId = bro_num.attr("data-goodsId");

            //判断购物车颜色
            if (purchase_times.text() >= 0) {
                $(".footimg1").hide();
                $(".footimg2").show();
                purchase_times.show();
            }

            //购买次数的加减
            var bro_num_add = Number(bro_num.text()) + 1;
            bro_num.text(bro_num_add);
            //购物车购买数量的加减
            var purchase_times_add = Number(purchase_times.text()) + 1;
            purchase_times.text(purchase_times_add);
            //console.log(Number(bro_num.text())+1);
            bro_num.show();
            bro_reduce.show();
            $(".foot-price").hide();
            $(".foot-price-show").show();
            // var a=Number(price_num.text()*bro_num.text());
            // total.text(a);
            // var a = Number(total.text())+Number(price_num.text());
            // var aa = Number(how_much_money.text())-Number(price_num.text());
            // total.text(a.toFixed(2));
            // how_much_money.text(aa);
            addPriceValuation(total, how_much_money, price_num);
            // if(total.text() >= 20){
            //  $(".foot-but").hide();
            //  $(".foot-but-show").show();
            // }
            // 调用购买按钮函数
            ifFootBut($(".foot-but"), $(".foot-but-show"), starting_price);

            // buyInfo.push("a")
            // var test = {};                      //空json对像
            // test['firstname'] = "tank";     //添加二个元素
            // test['lastname'] = "zhang";
            // console.log(test);              //查看
            // delete test['lastname'];        //删除json中的某个元素
            // console.log(test);
            // test1 = [{"name":"tank","total":"100"},{"name":"zhang","total":"23"},{"name":"hao","total":"325"}];  
            // add = {"name":"may"};  
            // test1.push(add);              //添加一个元素  
            // console.log(test1);    
            // delete test1[2];              //删除一个元素  
            // console.log(test1); 
            
            //添加到购物车的物品信息
            var cishu = 0;
            if (buyInfo.length == 0) {
                var newbuyInfo = {
                    "sellerName": sellerName.text(),
                    "price_num": price_num.text(),
                    "bro_num": bro_num.text(),
                    "data_goodsId": data_goodsId
                };
                buyInfo.push(newbuyInfo);
                 console.log(buyInfo);
                 console.log(buyInfo.length);
            } else {
                for (var i = 0; i < buyInfo.length; i++) {
                    if (buyInfo[i].data_goodsId == bro_num.attr('data-goodsId')) {
                        buyInfo[i].bro_num = bro_num.text();
 
                        // console.log("for1");
                        // console.log(buyInfo);
                        // console.log(buyInfo.length);
                    } else {
                        cishu++;
                        if (cishu == buyInfo.length) {
                            // console.log("for2");
                            var newbuyInfo = {
                                "sellerName": sellerName.text(),
                                "price_num": price_num.text(),
                                "bro_num": bro_num.text(),
                                "data_goodsId": data_goodsId
                            };
                            buyInfo.push(newbuyInfo);
                            console.log(buyInfo);
                        }
                    }
                }
            }
            console.log(buyInfo);
            createShoppingList(total,how_much_money,bro_num,starting_price,data_goodsId);
            
            // console.log(buyInfo);
            // console.log(jsonarray.sellerName,jsonarray.price_num,jsonarray.bro_num);
            // buyInfo.push({"goodsInfo":[{"sellerName":"回锅肉","yuanjia":"12","num":"10"}
            //     ,{"sellerName":"回锅肉","yuanjia":"12","num":"10"}]})
        });
    });

    //减少购买菜单
    reDuce.each(function() {
        $(this).click(function() {
            var bro_num = $(this).siblings(".num");
            var price_num = $(this).siblings(".price-num");
            var sellerName = $(this).parent().siblings(".p1");

            if (bro_num.text() == 1) {
                bro_num.text(0);
                bro_num.hide();
                $(this).hide();

                //购物车购买数量的加减
                var purchase_times_add = Number(purchase_times.text()) - 1;
                purchase_times.text(purchase_times_add);

                // $(".footimg1").show();
                // $(".footimg2").hide();
                //purchase_times.hide();
                // var b = Number(total.text())-Number(price_num.text());
                // var bb = Number(how_much_money.text())+Number(price_num.text());
                // console.log(b);
                // total.text(b);
                // how_much_money.text(bb);
                reducePriceValuation(total, how_much_money, price_num);
                // console.log("dd")
                // 
                //添加到购物车的物品信息
                for (var i = 0; i < buyInfo.length; i++) {
                    // if (buyInfo[i].sellerName == sellerName.text()) {
                    if (buyInfo[i].data_goodsId == bro_num.attr('data-goodsId')) {    
                            buyInfo[i].bro_num = bro_num.text();
                            if (buyInfo[i].bro_num == 0) {

                                console.log(buyInfo[i]);
                                delete buyInfo[i];
                                //取出json中删除时出现undefined的元素
                                for ( var i = 0; i < buyInfo.length; i++ ) { 
                                        if ( buyInfo[i] === undefined ) {
                                            buyInfo.splice( i, 1 );
                                            i--;
                                        }
                                    }
                                     
                            }
                        }
                    
                }
                createShoppingList(total,how_much_money,bro_num,starting_price);
                // console.log($(".ll").text(buyInfo.sellerName));
                // console.log(buyInfo);

                if (total.text() == 0) {
                    $(".foot-price").show();
                    $(".foot-price-show").hide();
                    // console.log("aa");
                    $(".footimg1").show();
                    $(".footimg2").hide();
                    purchase_times.hide();

                    $(".zhezhao").hide();
                    $(".shopping-list").css("transform", "translate(0,0)");
                }
                // if(total.text() <= 20){
                //              $(".foot-but").show();
                //              $(".foot-but-show").hide();
                //              // console.log("cc")
                //              }
                //              // 调用购买按钮函数
                    ifFootBut($(".foot-but"), $(".foot-but-show"), starting_price);
                }else{
                    //购买次数的加减
                    var bro_num_reDuce = Number(bro_num.text()) - 1;
                    bro_num.text(bro_num_reDuce);
                    //购物车购买数量的加减
                    var purchase_times_add = Number(purchase_times.text()) - 1;
                    purchase_times.text(purchase_times_add);

                    // var b = Number(total.text())-Number(price_num.text());
                    // var bb = Number(how_much_money.text())+Number(price_num.text());
                    // console.log(b);
                    // total.text(b.toFixed(2));
                    // how_much_money.text(bb);
                    reducePriceValuation(total, how_much_money, price_num);
                    // console.log("bb")
                    // if(total.text() <= 20){
                    //  $(".foot-but").show();
                    //  $(".foot-but-show").hide();
                    // }
                    // 调用购买按钮函数
                    ifFootBut($(".foot-but"), $(".foot-but-show"), starting_price);

                    //添加到购物车的物品信息
                    console.log(buyInfo);
                    for (var i = 0; i < buyInfo.length; i++) {
                        //if (buyInfo[i].sellerName == sellerName.text()) {
                        if (buyInfo[i].data_goodsId == bro_num.attr('data-goodsId')) {    
                            buyInfo[i].bro_num = bro_num.text();
                        }
                    }
                    console.log(buyInfo);

                    createShoppingList(total,how_much_money,bro_num,starting_price);
                    // for (var i = 0; i < buyInfo.length; i++) {
                    //     if (buyInfo[i].sellerName == sellerName.text()) {
                    //         buyInfo[i].bro_num = bro_num.text();

                    //         console.log("for1");
                    //         console.log(buyInfo);
                    //         console.log(buyInfo.length);
                    //     } else {
                    //         cishu++;
                    //         if (cishu == buyInfo.length) {
                    //             console.log("for2");
                    //             var newbuyInfo = {
                    //                 "sellerName": sellerName.text(),
                    //                 "price_num": price_num.text(),
                    //                 "bro_num": bro_num.text()
                    //             };
                    //             buyInfo.push(newbuyInfo);
                    //             console.log(buyInfo);
                    //         }
                    //     }
                    // }
                    
                }

        });
    });

    //购物车点击出现列表清单
    $(".footimg2").click(function() {
        var aa = $(".shopping-list").off().height() + ($(".foot").off().height()) / 1.3 + "px";
        // console.log(aa);
        $(".shopping-list").css("transform", "translate(0,-22.4rem)");
        // console.log(bb);
        $(".footimg2").css("transform", "translate(0,-" + aa + ")");
        $(".foot-price-show").css("transform", "translate(-3rem,0)");
        $(".purchase-times").css("transform", "translate(0,-" + aa + ")");
        $(".zhezhao").show();
        // $(".zhezhao").bind(
        // 　　"click", 
        // 　　function(event){
        // 　　　　event.stopPropagation();
        // 　　}
        // );
    });
    //点击消失列表清单
    $(".zhezhao").click(function() {
        $(".zhezhao").hide();
        $(".shopping-list").css("transform", "translate(0,0)");
        // console.log(bb);
        $(".footimg2").css("transform", "translate(0,0)");
        $(".foot-price-show").css("transform", "translate(0,0)");
        $(".purchase-times").css("transform", "translate(0,0)");
    });

    //总价与差价
    function addPriceValuation(original1, original2, val) {
        var a, aa;
        a = Number(original1.text()) + Number(val.text());
        aa = Number(original2.text()) - Number(val.text());
        original1.text(a.toFixed(2));
        original2.text(aa);
    }
    function reducePriceValuation(original1, original2, val) {
        var b, bb;
        b = Number(original1.text()) - Number(val.text());
        bb = Number(original2.text()) + Number(val.text());
        original1.text(b.toFixed(2));
        original2.text(bb);
    }

    //判断购买按钮是否变成红色
    function ifFootBut(butShow, butHide, butPrice) {
        if (total.text() < butPrice) {
            butShow.show();
            butHide.hide();
        } else {
            butShow.hide();
            butHide.show();
        }
    }

    //添加评价星级
    function pingfen(fen) {
        var a = '<img class="topcontainer-wapper-smallicon" src="images/man.png" />';
        var b = '<img class="topcontainer-wapper-smallicon" src="images/ban.png" />';
        var c = '<img class="topcontainer-wapper-smallicon" src="images/kong.png" />';
        var img = "";
        fen = parseFloat(fen);
        if (fen >= 0 && fen <= 0.4) {
            img = c + c + c + c + c;
        } else if (fen >= 0.5 && fen <= 0.9) {
            img = b + c + c + c + c;
        } else if (fen >= 1.0 && fen <= 1.4) {
            img = a + c + c + c + c;
        } else if (fen >= 1.5 && fen <= 1.9) {
            img = a + b + c + c + c;
        } else if (fen >= 2.0 && fen <= 2.4) {
            img = a + a + c + c + c;
        } else if (fen >= 2.5 && fen <= 2.9) {
            img = a + a + b + c + c;
        } else if (fen >= 3.0 && fen <= 3.4) {
            img = a + a + a + c + c;
        } else if (fen >= 3.5 && fen <= 3.9) {
            img = a + a + a + b + c;
        } else if (fen >= 4.0 && fen <= 4.4) {
            img = a + a + a + a + c;
        } else if (fen >= 4.5 && fen <= 4.9) {
            img = a + a + a + a + b;
        } else if (fen >= 5.0) {
            img = a + a + a + a + a;
        }
        return img;
    }
    $(".topcontainer-wapper-margintop").prepend(pingfen(3.2));

    //创建购物清单
    function createShoppingList(all,d_val,val,start_val,id){
        $(".shopping-list-bottom-box").remove();
        for (var i = 0; i < buyInfo.length; i++){
            var a1 = $("<div></div>");
            a1.addClass("shopping-list-bottom-box xiugai"+i);
            var b1 = $("<span>"+buyInfo[i].sellerName+"</span>");
            b1.addClass("ll");
            var b2 = $("<div>￥</div>");
            b2.addClass("price");
            var c1 = $("<span>"+buyInfo[i].price_num+"</span>");
            c1.addClass("price-num");
            var c2 = $("<span>-</span>");
            c2.addClass("reduce");
            c2.css("display","block");
            var c3 = $("<span id="+buyInfo[i].data_goodsId+">"+buyInfo[i].bro_num+"</span>");
            c3.addClass("num");
            c3.css("display","block");
            var c4 = $("<span>+</span>");
            c4.addClass("plus");
            b2.append(c1);
            b2.append(c2);
            b2.append(c3);
            b2.append(c4);
            a1.append(b1);
            a1.append(b2);
            $(".shopping-list-bottom").append(a1);
            // console.log(xiugaiplus);
        }    

        // var xiugaiprice_num = $(".ll").siblings(".price").find(".price-num");
        var xiugaiplus = $(".ll").siblings(".price").find(".plus");
        var xiugainum = $(".ll").siblings(".price").find(".num");
        var xiugaireduce = $(".ll").siblings(".price").find(".reduce");
        //购物车里的添加按钮
        xiugaiplus.each(function() {
            $(this).click(function(){
                var xiugainum1 = $(this).siblings(".num");
                var xiugaiprice_num1 = $(this).siblings(".price-num");
                var Li = $(this).parent().siblings(".ll").text();

                var xiugainum1_add = Number(xiugainum1.text()) + 1;
                xiugainum1.text(xiugainum1_add);
                var xiugainum1id = xiugainum1.attr("id");
                //用自定义id获取数值
                var aDDxiugai_add = Number($(".num[data-goodsId="+xiugainum1id+"]").text())+1;
                $(".num[data-goodsId="+xiugainum1id+"]").text(aDDxiugai_add);

                //用自定义标题名获取数值
                // var Li = $(this).parent().siblings(".ll").text();
                // // console.log(Li);
                // for(var i = 0;i<6;i++){
                //     var P1 = $(".p1").eq(i);
                //     // console.log(P1.text());
                //     if(P1.text() == Li){
                //         // console.log("chenggong");
                //         var P1xiugai = Number(P1.siblings(".price").find(".num").text())+1;
                //         P1.siblings(".price").find(".num").text(P1xiugai);
                //         // console.log(P1xiugai)
                //     }
                //     // console.log(P1.text());
                // }
                addPriceValuation(total, d_val, xiugaiprice_num1);
                ifFootBut($(".foot-but"), $(".foot-but-show"), start_val);

                var cishu1;
                for (var i = 0; i < buyInfo.length; i++) {
                    if (buyInfo[i].sellerName == Li) {
                        buyInfo[i].bro_num = xiugainum1.text();
                    } else {
                        cishu1++;
                        if (cishu1 == buyInfo.length) {
                            // console.log("for2");
                            var newbuyInfo = {
                                "sellerName": sellerName.text(),
                                "price_num": price_num.text(),
                                "bro_num": bro_num.text()
                            };
                            buyInfo.push(newbuyInfo);
                            console.log(buyInfo);
                        }
                    }
                }
                //购物车购买数量的加减
                var purchase_times_add = Number(purchase_times.text()) + 1;
                purchase_times.text(purchase_times_add);
            });
        });
 
        //购物车里的减少按钮
        xiugaireduce.each(function() {
            $(this).click(function(){
                var xiugainum2 = $(this).siblings(".num");
                var Li2 = $(this).parent().siblings(".ll").text();
                var xiugaiprice_num2 = $(this).siblings(".price-num");
       

                var xiugainum2id = xiugainum2.attr("id");

                if(xiugainum2.text()==1){
                    var xiugainum2_add = Number(xiugainum2.text()) - 1;
                    xiugainum2.text(xiugainum2_add);
                    var aDDxiugai_reduce = Number($(".num[data-goodsId="+xiugainum2id+"]").text())-1;
                    $(".num[data-goodsId="+xiugainum2id+"]").text(aDDxiugai_reduce);
                    $(".num[data-goodsId="+xiugainum2id+"]").hide();
                    $(".num[data-goodsId="+xiugainum2id+"]").siblings(".reduce").hide();

                    var purchase_times_add = Number(purchase_times.text()) - 1;
                    purchase_times.text(purchase_times_add);

                    reducePriceValuation(total, d_val, xiugaiprice_num2);
                    ifFootBut($(".foot-but"), $(".foot-but-show"), start_val);

                    for (var i = 0; i < buyInfo.length; i++) {
                        if (buyInfo[i].sellerName == Li2) {
                            buyInfo[i].bro_num = xiugainum2.text();
                            if (buyInfo[i].bro_num == 0) {
                                $(this).parent().parent().remove();
                               
                                console.log(buyInfo[i]);
                                delete buyInfo[i];
                                //取出json中删除时出现undefined的元素
                                for ( var i = 0; i < buyInfo.length; i++ ) { 
                                        if ( buyInfo[i] === undefined ) {
                                            buyInfo.splice( i, 1 );
                                            i--;
                                        }
                                    }
                                     
                            }
                        }
                    
                    }
                    var aa = $(".shopping-list").off().height() + ($(".foot").off().height()) / 1.3 + "px";
                    $(".footimg2").css("transform", "translate(0,-" + aa + ")");
                    $(".purchase-times").css("transform", "translate(0,-" + aa + ")");
                    if (total.text() == 0) {
                        $(".foot-price").show();
                        $(".foot-price-show").hide();
                        // console.log("aa");
                        $(".footimg1").show();
                        $(".footimg2").hide();
                        purchase_times.hide();

                        $(".zhezhao").hide();
                        $(".shopping-list").css("transform", "translate(0,0)");
                        // console.log(bb);
                        $(".footimg2").css("transform", "translate(0,0)");
                        $(".foot-price-show").css("transform", "translate(0,0)");
                        $(".purchase-times").css("transform", "translate(0,0)");
                    }

                    
                }else{
                    var xiugainum2_add = Number(xiugainum2.text()) - 1;
                    xiugainum2.text(xiugainum2_add);
                    var aDDxiugai_reduce = Number($(".num[data-goodsId="+xiugainum2id+"]").text())-1;
                    $(".num[data-goodsId="+xiugainum2id+"]").text(aDDxiugai_reduce);

                    var purchase_times_add = Number(purchase_times.text()) - 1;
                    purchase_times.text(purchase_times_add);


                    reducePriceValuation(total, d_val, xiugaiprice_num2);
                    ifFootBut($(".foot-but"), $(".foot-but-show"), start_val);

                    for (var i = 0; i < buyInfo.length; i++) {
                        if (buyInfo[i].sellerName == Li2) {
                            buyInfo[i].bro_num = xiugainum2.text();
                            if (buyInfo[i].bro_num == 0) {
                                $(this).parent().parent().remove();
                               
                                console.log(buyInfo[i]);
                                delete buyInfo[i];
                                //取出json中删除时出现undefined的元素
                                for ( var i = 0; i < buyInfo.length; i++ ) { 
                                        if ( buyInfo[i] === undefined ) {
                                            buyInfo.splice( i, 1 );
                                            i--;
                                        }
                                    }
                                     
                            }
                        }
                    
                    }
                }
            });
        });
    

    }
    //清空购物车
    $(".shopping-list-top").click(function(){
        buyInfo = [];
        $(".shopping-list-bottom-box").remove();
        $(".foot-price").show();
        $(".foot-price-show").hide();
        $(".total").text(0);
        // console.log("aa");
        $(".footimg1").show();
        $(".footimg2").hide();
        purchase_times.hide();
        purchase_times.text(0);

        $(".zhezhao").hide();
        $(".shopping-list").css("transform", "translate(0,0)");
        // console.log(bb);
        $(".footimg2").css("transform", "translate(0,0)");
        $(".foot-price-show").css("transform", "translate(0,0)");
        $(".purchase-times").css("transform", "translate(0,0)");
        $(".foot-but").show();
        $(".foot-but-show").hide();
        $(".how-much-money").text(starting_price);
        console.log(buyInfo);
        $(".num").hide();
        $(".num").text(0);
        $(".reduce").hide();
    });
}