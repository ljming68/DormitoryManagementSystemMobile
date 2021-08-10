<template>
    <div class="main">
       <!-- <div class="noticeheader">
          
       </div> -->
       <div class="noticeContent">
          
           <div class="date">{{notice[0].date}}</div>
            <div class="noticetitle">{{notice[0].title}}</div>
           <div class="content">{{notice[0].content}}</div>
           <div class="footer"></div>
       </div>
    </div>
</template>


<script>

export default {
    data(){
        return {
             notice:[{
                date:'2021-07-15',
                title:'科普：新冠疫苗第三剂加强针是否必要',
                content:'新华社北京7月23日电（记者冯玉婧）由于变异新冠病毒德尔塔毒株在全球肆虐，世界大部分地区仍笼罩在疫情阴影中，已有部分国家宣布或正考虑为部分人群打新冠疫苗第三剂加强针。但也有研究人员表示第三剂加强针虽可增强免疫反应，但并非必要。是否打第三剂加强针，已成为各国政府和科研界探讨的话题。'
               +'为何要打加强针？这是因为某些疫苗的保护效果可能会随时间推移而减弱，为了提供额外保护作用而需要再次接种疫苗，以刺激机体产生和提高抗体水平。对于许多预防病毒感染的疫苗，打加强针很常见，例如每年打一次加强针的流感疫苗。'+'人们可能需打新冠疫苗加强针的另一个原因是病毒变异。英国牛津大学新冠疫苗小组的一位发言人表示，一些变异毒株已进化到可以避开人体部分免疫反应，这意味着它们能更容易地感染那些感染新冠病毒后痊愈或接种过疫苗的人。然而病毒无法避开人体所有免疫反应。打加强针是有帮助的，因为这能使变异毒株无法避开的部分免疫反应得以增强。',        

            },]

        }
    }
    
}
</script>


<style lang="css">
    .noticeheader{position: sticky;top:0}
    .mint-header{height: 50px;font-size: 20px;}
    .noticeContent{flex: 1;background-color:#bbb4b4;display: flex;flex-direction: column;}
    
    .noticetitle{text-align: center;font-size: 30px;font-weight: 900;height:100px ;}
    .date{font-size: 18px}
    .content{font-size: 20px}
    
</style>