export function fetchAllProducts() {
    return new Promise(async (resolve) => {
      const response =  await fetch('http://localhost:8080/products')
      const data = await response.json()
      resolve({data})
    }
    );
  }
  
export function fetchProductsByFilters(filter,sort,pagination) {
  //filter = {"category":["beauty", "groceries"]}
  //sort = {_sort:"price",_order:"desc"}
  //pagination= :{_page:1,_limit=10}
  //TODO: on server we will support multi values in filter

let queryString = '';
for(let key in filter) {
 const categoryValues = filter[key]
 if(categoryValues.length){
 const lastCategoryValue = categoryValues[categoryValues.length-1]
  queryString += `${key}=${lastCategoryValue}&`
}
}

for(let key in sort) {
  queryString += `${key}=${sort[key]}&`
}
for(let key in pagination) {
  queryString += `${key}=${sort[key]}&`
}

 return new Promise(async (resolve) => {
      const response =  await fetch('http://localhost:8080/products?'+queryString)
      const data = await response.json()
      resolve({data})
    }
    );
  }
  