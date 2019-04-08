export {cardType,hourCont,minuteCont,heightCont,radixPoint,weightCont,tenCont,bitCon,sexCon,headCon,yunCon,booleanCon,weekCon,bornCon,alltenCon,hasCon,birthDefect,momAge,addressCon,hukCon}

let cardType=[    //证件类型
    {text: '身份证', value: '身份证'},
    {text: '护照', value: '护照'}
];

let hourCont=[]         //小时范围
for(let i =0; i< 24; i ++){
    let obj= {text: i+"小时", value: i};
    hourCont.push(obj)
}

let minuteCont=[]         //分钟范围
for(let i = 1; i< 60; i ++){
    let obj= {text: i+"分钟", value: i};
    minuteCont.push(obj)
}

let heightCont=[]         //身高范围
for(let i =20;i<201;i++){
    let obj= {text: i, value: i};
    heightCont.push(obj)
}
let radixPoint=[]       //.0
for(let i =0;i<10;i++){
    let obj= {text: '.'+i, value: '.'+i};
    radixPoint.push(obj)
}
let weightCont=[]       //体重
for(let i =1;i<151;i++){
    let obj= {text: i, value: i};
    weightCont.push(obj)
}
let tenCont=[]          //0~9
for(let i =0;i<10;i++){
    let obj= {text: i, value: i};
    tenCont.push(obj)
}
let bitCon=[           //是否
    {text: '是', value: '是'},
    {text: '否', value:  '否'}
]
let booleanCon=[           //是否
    {text: '是', value: 1},
    {text: '否', value:  0}
]
let sexCon=[
    {text: '男', value: 1},
    {text: '女', value: 0}
]
let headCon=[]  //1~100
for(let i =1;i<101;i++){
    let obj= {text: i, value: i};
    headCon.push(obj)
}
let yunCon=[]      //20-50
for(let i =20;i<51;i++){
    let obj= {text: i, value: i};
    yunCon.push(obj)
}
let weekCon=[]
for(let i =0;i<8;i++){
    let obj= {text: i, value: i};
    weekCon.push(obj)
}
let bornCon=[         //分娩方式
    {text: '顺产', value: '顺产'},
    {text: '刨宫产', value: '刨宫产'},
    {text: '产钳', value: '产钳'},
    {text: '吸引', value: '吸引'},
    {text: '臀牵', value: '臀牵'},
    {text: '臀助', value: '臀助'},
    {text: '其他', value: '其他'}
]
let alltenCon=[]
for(let i =0;i<11;i++){
    let obj= {text: i, value: i};
    alltenCon.push(obj)
}
let hasCon=[           //有，无
    {text: '有', value: '有'},
    {text: '无', value: '无'}
]
let birthDefect=[
    {label: '无脑畸形', value: '无脑畸形'},
    {label: '脊柱裂', value: '脊柱裂'},
    {label: '脑膨出', value: '脑膨出'},
    {label: '先天性脑积水', value: '先天性脑积水'},
    {label: '腭裂', value: '腭裂'},
    {label: '唇裂', value: '唇裂'},
    {label: '唇裂合并腭裂', value: '唇裂合并腭裂'},
    {label: '小耳(包括无耳)', value: '小耳(包括无耳)'},
    {label: '外耳其他畸形', value: '外耳其他畸形'},
    {label: '食道闭锁或狭窄', value: '食道闭锁或狭窄'},
    {label: '直肠闭锁或狭窄', value: '直肠闭锁或狭窄'},
    {label: '尿道下裂', value: '尿道下裂'},
    {label: '膀胱外翻', value: '膀胱外翻'},
    {label: '马蹄内翻', value: '马蹄内翻'},
    {label: '多指(趾)', value: '多指(趾)'},
    {label: '并指(趾)', value: '并指(趾)'},
    {label: '肢体短缩', value: '肢体短缩'},
    {label: '先天性膈氙', value: '先天性膈氙'},
    {label: '脐膨出', value: '脐膨出'},
    {label: '腹裂', value: '腹裂'},
    {label: '联体双胎', value: '联体双胎'},
    {label: '唐氏综合征', value: '唐氏综合征'},
    {label: '先天性心脏病', value: '先天性心脏病'},
    {label: '足月小头畸形', value: '足月小头畸形'},
    {label: '先天性肺不张', value: '先天性肺不张'},
    {label: '肺发育不良', value: '肺发育不良'},
    {label: '食道气管瘘', value: '食道气管瘘'},
    {label: '巨结肠症', value: '巨结肠症'},
    {label: '成骨不全', value: '成骨不全'},
    {label: '肾不发育', value: '肾不发育'},
    {label: '畸胎瘤', value: '畸胎瘤'},
    {label: '先天性梅毒', value: '先天性梅毒'},
    {label: '其他', value: '其他'}
]
let momAge=[]
for(let i =10;i<71;i++){
    let obj= {text: i, value: i};
    momAge.push(obj)
}
let addressCon=[           //
    {text: '城镇', value: 1},
    {text: '农村', value: 0}
]
let hukCon=[           //
    {text: '本区县', value: '本区县'},
    {text: '本市', value: '本市'},
    {text: '本省外市', value: '本省外市'},
    {text: '外省', value: '外省'}
]