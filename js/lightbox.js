;
(function () {
    var Lightbox=function(){
        //this指向lightbox
        var that=this;
        debugger;
        this.initData();
        this.build();
        $('body').delegate(".lightbox_button_next","click",function () {
            that.nextImg();
        });

        $('body').delegate(".lightbox_button_pre","click",function () {
            that.preImg();
        });
    };

    Lightbox.prototype={
            album:{},
            preloadImg:function (src,callack) {
                var img=new Image();
                img.onload=function () {
                    callack();
                }
                img.src=src;
            },
            createMask:function(){
                $('<div class="lightbox_mask"></div>').appendTo('body');
            },
            popLightboxWin:function(){
                $('<div id="lightbox" class="lightbox_popup"> <div class="lightbox_pic_image"> <img src="./images/1-3.jpg"> </div> <div class="lightbox_button"> <a class="lightbox_button_pre"></a> <a class="lightbox_button_next"></a> </div> <div class="lightbox_footer"> <div class="lightbox_details"> <span class="lightbox_caption">你的名字</span> <span class="lightbox_index">Image 2 of 4</span> </div> <div class="lightbox_close"> <a class="lightbox_button_close"></a> </div> </div> </div>').appendTo('body');
                this.$lightbox=$('#lightbox');
                this.$lightImg=this.$lightbox.find('img')
            },

           build:function(){
                var that=this;
              /* $('body').delegate('a[data-lightbox]','click',
               })*/
              $.each($('a[data-lightbox]'),function (index,ele) {
                  $(this).click(function () {
                      that.createMask();
                      that.popLightboxWin();

                      debugger;
                      var src=$(this).data("resource");
                       that.groupName=$(this).data('lightbox');
                      var imgCaption=$(this).data('title');
                      var indexObj=that.getImgIndex(that.groupName,src);
                      that.$lightImg.attr("src",src);
                      that.displayButton(indexObj);
                      that.setImgIndex(indexObj);
                      if(imgCaption!='')
                          $('.lightbox_caption').text(imgCaption);


                      that.$lightbox.animate({top:"10%",left:"50%"},8000);
                  });
              })
           },
        setImgIndex:function(indexObj){
            if(indexObj.total==1){
                return;
            }else{
                   $('.lightbox_index').text("Image "+indexObj.current+" of "+indexObj.total);
            }
        },
        preImg:function () {
           var indexObj=this.getImgIndex(this.groupName,this.$lightImg.attr("src"));
            indexObj.current=indexObj.current-1;
            var imgArr=this.album[this.groupName];
            this.$lightImg.attr("src",imgArr[indexObj.current-1].src);
            this.displayButton(indexObj);
        },
        nextImg:function(){
            var that=this;
            var indexObj= this.getImgIndex(this.groupName,this.$lightImg.attr("src"));
            indexObj.current=indexObj.current+1;
            var imgArr=this.album[this.groupName];
            this.preloadImg(imgArr[indexObj.current-1].src,function(){
                that.$lightImg.attr("src",imgArr[indexObj.current-1].src);
            })
            //this.$lightImg.attr("src",imgArr[indexObj.current-1].src);
            this.displayButton(indexObj);
        },
        displayButton:function(indexObj){
            if(indexObj.total==1){
                $('.lightbox_button_pre').css("display",'none');
                $('.lightbox_button_next').css("display",'none');
            }else if(indexObj.current==indexObj.total){
                $('.lightbox_button_pre').css("display",'block');
                $('.lightbox_button_next').css("display",'none');
            }else if(indexObj.current==1){
                $('.lightbox_button_pre').css("display",'none');
                $('.lightbox_button_next').css("display",'block');
            }else{
                $('.lightbox_button_pre').css("display",'block');
                $('.lightbox_button_next').css("display",'block');
            }
        },
        getImgIndex:function (groupName,src) {
            var imgArr=this.album[groupName];
            var imgIndex=0;
            for(var i=0;i<imgArr.length;i++){
                var lightImg=imgArr[i];
                if(src==lightImg.src){
                    imgIndex=i;
                    break;
                }
            }
            var indexObj={
                current:imgIndex+1,
                total:imgArr.length
            }

            return indexObj;
        },
        initData:function(){
            debugger;
            var that=this;
            var all=$('a[data-lightbox]');
            for(var i=0;i<all.length;i++){

                //分组名称
                var gropName=$(all[i]).data('lightbox');
                var imgSrc=$(all[i]).find("img").attr("src");
                var imgCaption=$(this).data('title');
                var lightImg={
                    src:imgSrc,
                    caption:imgCaption
                };
                if(that.album[gropName]==undefined){
                    var imgArr=new Array();
                    imgArr.push(lightImg);
                    that.album[gropName]=imgArr;
                }else{
                    that.album[gropName].push(lightImg);
                }
            }
        }

    }

    window["Lightbox"]=Lightbox;
})(jQuery);