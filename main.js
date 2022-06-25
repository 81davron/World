let massiv = []
let massivC = []
let savat = []
let start_value = 0, end_value = 370
select__onchange()
$.ajax("https://myjson.dit.upm.es/api/bins/j8nl", {
    success : function(res){
        // console.log(res)
        render(res)
        massiv = res
    }
})

function select__onchange() {
    $.ajax("https://myjson.dit.upm.es/api/bins/awi1", {
        success: (res) => {
            select(res)
           
            
        }
    })
}




function filterByPrice(val, type) {
    let value = Number(val.value)
    if (type == "start") {
        start_value = value;
    } else if (type == "end") {
        end_value = value;
    }
    let filterByCost = massiv.filter(product => {
        return Number(product.cost) >= start_value && Number(product.cost) <= end_value
    })
    render(filterByCost)
}

function select(item) {
    $(".search").on("input", (  ) => {
        
        let value = $(".search").val()
    
         let searchResult = massiv.filter(item => {
             return item.name.toLowerCase().includes(value.toLowerCase()) || item.id.includes(value)
         })
         
    
         render(searchResult)
     })
    item.forEach(element => {
        let option = `
            <option value="${element.category}">${element.category}</option>
            
        `
        $(".select").append(option)
    });
}

function getCat(params) {
    console.log(params.value)
    let massivC = massiv.filter(item => {
        return item.category.toLowerCase().includes(params.value.toLowerCase())
    })
    render(massivC)
}
function render(data){
    $(".result").html("")
    let index = 0
    data.map(item =>{
        let card = `
        <div class="col-4">
        <div class="card p-3 carl">
            <img  class="img-fluid rasm" src="${item.img_src}">
            <h4 class="text-center">${item.name}</h4>
            <h4 class="text-center">${item.cost} $</h4>
            <button class="butt my-3" onclick="fun(${index})">Sotib olish</button>
        </div>
        </div>
        `
        $(".result").append(card)
        index++
    })
}

$(".menu").on("click", () => {
    $(".savatcha").addClass("d-none")
    $(".mahsulotlar").removeClass("d-none")
})

$(".back").on("click", () => {
    $(".mahsulotlar").addClass("d-none")
    $(".savatcha").removeClass("d-none")

    filter()
})

 function fun(val) {
    let sanoq = 0
    let savat_index = 0
    for (let i = 0; i < savat.length; i++) {
        if (savat[i].cost == massiv[val].cost && savat[i].name == massiv[val].name) {
            sanoq++
            savat_index = i
        }
    }

    if (sanoq == 1) {
        savat[savat_index].miqdor = savat[savat_index].miqdor + 1
    } else if (sanoq == 0) {
        savat.push({
            img: massiv[val].img_src,
            name: massiv[val].name,
            cost: massiv[val].cost,
            miqdor: 1
        })
        
    }
}
function filter() {
    $(".cart").html("")

    let son_2 = 0
    let son = 0
    savat.forEach(box => {
        let card = `
        <div class="col-3">
        <div class="card carl  p-3">
         <img class="img-fluid rasm"src=${box.img}
          alt="rasm bor">
        <div>
          <h4>${box.cost * box.miqdor} $</h4>
           <h4>${box.name}</h4>
           <div class="d-flex"><button onclick="minus(${son})" class=" btn btn-primary rise rounded-0 tugmacha ">-</button><button class="btn border rounded-0 tugmacha"><h3>${box.miqdor}</h3></button><button onclick="plus(${son_2})" class=" rise tugmacha btn btn-primary rounded-0">+</button></div>
        </div>
        </div>
        </div>
        `
        son++
        son_2++
        $(".cart").append(card)
    })

    let hisob = 0

    savat.forEach(item => {
        hisob += Number(item.cost) * Number(item.miqdor)
    })

    $(".all_cost").html("")
    let p = `
      <h2 class="text-center fw-bold titl mt-3">ALL COST: ${hisob} $</h2>
      `
    $(".all_cost").append(p)
}
function minus(son) {
    if (savat[son].miqdor > 1) {
        savat[son].miqdor -= 1
        filter()
    } else {
        savat.splice(son, 1)
        filter()
        notti()
    }
}

function plus(son_2) {
    savat[son_2].miqdor += 1
    filter()
}


// $(".butt").on("click", (val)=>{
//     console.log(val.target.val())
// })

// function fun(val){
//     console.log(val);
// }