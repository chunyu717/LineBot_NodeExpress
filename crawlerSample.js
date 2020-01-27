
const phantom = require('phantom'); // import module 

//async解决回调问题,es7的内容
async function earthquake2 () {
     // await解决回调问题，创建一个phantom实例
    const instance = await phantom.create();
    //通过phantom实例创建一个page对象，page对象可以理解成一个对页面发起请求和处理结果这一集合的对象
    const page = await instance.createPage();
    //页面指向的是哪个一个url
    await page.on("onResourceRequested", function(requestData) {
        //console.info('Requesting', requestData.url)
    });
     //得到打开该页面的状态码
    const status = await page.open('https://www.mainpi.com/query?i=587');

    var result = await page.evaluate(function() {
      var count = 1;
      return $('.callnum_display.center-block').map(function() {
          return ({
              index: count++,
              title: $(this).find('span').text()
          })
      }).toArray()
  })
  console.log( new Date() ) ;
  console.log( result )
  console.log( 'result[0].title = ', result[0].title ) ;

  if ( result[0].title == '17') {
        job.cancel();
  }

    //输出内容
   //退出该phantom实例
    await instance.exit();
};

var schedule = require('node-schedule');
var job = null ;
function scheduleCronstyle(){

    job = schedule.scheduleJob('*/10 * * * * *', earthquake2 );
}

scheduleCronstyle();
