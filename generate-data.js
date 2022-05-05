const faker = require("faker");
const fs = require("fs");
faker.locale = "vi";
console.log(faker.commerce.productName());
console.log(faker.name.firstName());
console.log(faker.datatype.uuid());

const randomCategoryList = (n) => {
  const categoryList = [];
  if (n <= 0) return [];
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.unique(faker.commerce.department),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });
  return categoryList;
};

const randomProductList = (categoryList, n) => {
  const productList = [];
  if (n <= 0) return [];
  for (category of categoryList) {
    Array.from(new Array(n)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        thumbnailURL: faker.image.imageUrl(500, 500),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      productList.push(product);
    });
  }
  return productList;
};
//IIFE
(() => {
  //ramdom data categories
  const categoryList = randomCategoryList(4);

  //random data products
  const productList = randomProductList(categoryList, 5);
  console.log("productList", productList);
  //init data
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: "Nhật Bùi",
    },
  };

  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("Generate sussess");
  });
})();
