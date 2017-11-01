productDB = [
  {
    id: 1,
    name: "Awesome Shoes Adventure",
    price: 29,
    attributes: [
      {
        color: [
          {
            hex: "#0096db",
            img: "images/p1-thumb-1.jpg" 
          },
          {
            hex: "#ff6924",
            img: "images/p1-thumb-2.jpg" 
          }
        ],
        size: [
          "small", "medium"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Cool Shoes Sport",
    price: 19,
    attributes: [
      {
        color: [
          {
            hex: "#0096db",
            img: "images/p2-thumb-1.jpg" 
          },
          {
            hex: "#ff6924",
            img: "images/p2-thumb-2.jpg" 
          }
        ],
        size: [
          "small", "medium"
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Wonderful Shoes",
    price: 49,
    attributes: [
      {
        color: [
          {
            hex: "#0096db",
            img: "images/p3-thumb-1.jpg" 
          },
          {
            hex: "#ff6924",
            img: "images/p3-thumb-2.jpg" 
          }
        ],
        size: [
          "small", "medium"
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Rapid Shoes Wings",
    price: 79,
    attributes: [
      {
        color: [
          {
            hex: "#0096db",
            img: "images/p4-thumb-1.jpg" 
          },
          {
            hex: "#ff6924",
            img: "images/p4-thumb-2.jpg" 
          }
        ],
        size: [
          "small", "medium"
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Superstar Soccer Shoes",
    price: 99,
    attributes: [
      {
        color: [
          {
            hex: "#0096db",
            img: "images/p5-thumb-1.jpg" 
          },
          {
            hex: "#ff6924",
            img: "images/p5-thumb-2.jpg" 
          }
        ],
        size: [
          "small", "medium"
        ]
      }
    ]
  },
  {
    id: 6,
    name: "HeyHoo Shoes",
    price: 59,
    attributes: [
      {
        color: [
          {
            hex: "#0096db",
            img: "images/p6-thumb-1.jpg" 
          },
          {
            hex: "#ff6924",
            img: "images/p6-thumb-2.jpg" 
          }
        ],
        size: [
          "small", "medium"
        ]
      }
    ]
  }
]

document.addEventListener("DOMContentLoaded", function() {

  var productCustomization = document.querySelectorAll('.customization'),
      cart = document.querySelector('.cart');

  initCustomization(productCustomization);

  function initCustomization(items) {

    items.forEach(function(element) {
      var actual = element;

      selectOptions = actual.querySelectorAll('[data-type="select"]');
      addToCartBtn = actual.querySelector('.add-to-cart');
      touchSettings = actual.querySelector('.customization-trigger');

      selectOptions.forEach(function(optionElem){
        optionElem.addEventListener('click', function(ev){
          
          var selected = this;
          selected.classList.toggle('is-open');
          resetCustomization(selected);
  
          if(event.target.nodeName == "LI") {
            
            var activeItem = event.target,
                index = indexInParent(activeItem) + 1;
            
            noActiveItems = activeItem.parentNode.querySelectorAll('li');
            noActiveItems.forEach(function(item){
              item.classList.remove('active');
            });
  
            activeItem.classList.add('active');
            selected.classList.remove('selected-1');
            selected.classList.remove('selected-2');
            selected.classList.add('selected-'+index);
            
            // if color has been changed, update the visible product image 
            selected.classList.contains('color') && updateSlider(selected, index-1);
            activeItem.classList.contains('small') && scaleProduct(selected, true);
            activeItem.classList.contains('medium') && scaleProduct(selected, false);
            
          }
  
        }); 
      });
      
      //detect click on the add-to-cart button
			addToCartBtn.addEventListener('click', function() {	
        updateCart();

        var myProducts  = localStorage.getItem("myProducts") ? JSON.parse(localStorage.getItem("myProducts")) : [];
        

        var singleItem = this.parentNode.parentNode;

        var productID = singleItem.getAttribute("data-id");
        var productName = singleItem.parentNode.querySelector(".item-info").querySelector("a").innerText;
        var color = singleItem.querySelector(".color").classList.contains("selected-2") ? 2 : 1;
        var size  = singleItem.querySelector(".size").classList.contains("selected-2") ? 2 : 1;

        singleItem.classList.add("grayscale");
        this.setAttribute("disabled","disabled");



        var newProduct = {
          id: productID,
          name: productName,
          color: color,
          size: size
        }

        myProducts.push(newProduct);
        myProducts = JSON.stringify(myProducts);
        localStorage.setItem('myProducts', myProducts);
        

			});

    }, this);

  }

  // Close Select Options
  function resetCustomization(selectOptions) {
		
    var othersChild = getSiblings(selectOptions);
    var parentSingleItem = selectOptions.parentNode.parentNode;

    var othersSingleItem = getSiblings(parentSingleItem.parentNode);

    othersSingleItem.forEach(function(item){
      item.querySelector('.single-item').classList.remove('hover');
      item.querySelectorAll('[data-type="select"]').forEach(function(item){
        item.classList.remove('is-open');
      });
    });

    parentSingleItem.classList.add('hover');
    othersChild.forEach(function(item){
      item.classList.remove('is-open');
    })

  }

  function updateSlider(actual, index) {
    
    var slider = actual.parentNode.parentNode.querySelector('a').querySelector('.slider-wrapper'),
        slides = slider.querySelectorAll('li');

    slides[index].classList.remove('move-left');
    slides[index].classList.add('selected');

    slideSiblings = getSiblings(slides[index]);
    slideSiblings.forEach(function(item){
      item.classList.remove('selected');
      item.classList.add('move-left');
    });
  }

  function scaleProduct(actual, hasChange) {

    var actualImages = actual.parentNode.parentNode.querySelectorAll('img');
    
    if(hasChange) {
      actualImages.forEach(function(item){
        item.classList.add('small-image');
      });
    } else {
      actualImages.forEach(function(item){
        item.classList.remove('small-image');
      });
    }
    
  }
  
  function updateCart() {
    //show counter if this is the first item added to the cart
    ( !cart.classList.contains('items-added') ) && cart.classList.add('items-added');

		var cartItems = cart.querySelector('span'),
        text = parseInt(cartItems.innerText) + 1;
    
    if(text >= 1) {
      document.querySelector(".page-title a").classList.add("show");
    }
		cartItems.innerText = text;
	}
  
  function indexInParent(node) {
      var children = node.parentNode.childNodes;
      var num = 0;
      for (var i=0; i<children.length; i++) {
          if (children[i]==node) return num;
          if (children[i].nodeType==1) num++;
      }
      return -1;
  }

  function getSiblings(elem) {
    var siblings = [];
    var sibling = elem.parentNode.firstChild;
    for(; sibling; sibling = sibling.nextSibling) {
      if (sibling.nodeType !== 1 || sibling === elem) continue;
      siblings.push(sibling);
    }

    return siblings;
  }

  // *** Checkout Functions ***
  initCheckout();

  function initCheckout() {
    var myProducts  = localStorage.getItem("myProducts") ? JSON.parse(localStorage.getItem("myProducts")) : [];
    var totalPrice = 0;

    myProducts.forEach(function(product){

      var productName = productDB[product.id - 1].name;
      var productPrice = productDB[product.id - 1].price;
      var productImage = productDB[product.id - 1].attributes[0].color[product.color - 1].img;
      
      var newElement = document.createElement("div");
      newElement.classList.add("cart-item");

      var itemProduct = document.createElement("div");
      itemProduct.classList.add('item-product');
      itemProduct.innerHTML = '<div class="thumb"><img src="' + productImage + '" alt="Preview image"></div><p>' + productName + '</p>';

      var itemQuantity = document.createElement("div");
      itemQuantity.classList.add('item-quantity');
      itemQuantity.innerHTML = "<span>1</span>";

      var itemPrice = document.createElement("div");
      itemPrice.classList.add('item-price');
      itemPrice.innerHTML = '$<span>' + productPrice + '</span>';
      
      var itemRemove = document.createElement("div");
      itemRemove.classList.add('item-remove');
      itemRemove.innerHTML = '<a href="#0" data-id="' + product.id + '">X</a>';

      newElement.appendChild(itemProduct);
      newElement.appendChild(itemQuantity);
      newElement.appendChild(itemPrice);
      newElement.appendChild(itemRemove);

      document.querySelector('.cart-content').appendChild(newElement);
      totalPrice += productPrice;
    });

    document.querySelector('.cart-total').querySelector('span').innerText = "$" + totalPrice;

    // Remove item from cart
    var btnRemove = document.querySelectorAll('.item-remove');
    btnRemove.forEach(function(btn){
      var btn = btn.querySelector('a');
      btn.addEventListener('click', function(e){
        e.preventDefault();
        var itemPrice = this.parentNode.parentNode.querySelector('.item-price').querySelector('span').innerText;
        totalPrice -= itemPrice;
        document.querySelector('.cart-total').querySelector('span').innerText = "$" + totalPrice;
        this.parentNode.parentNode.remove();
      })
      
    });
  }

  // Validade Form
  function validateEmpty(event) {
    if(!this.value) {
      this.classList.add('invalid');
      this.placeholder = "This field can't be empty"
    } else {
      this.classList.remove('invalid');
      this.placeholder = "";
    }
  }

  function validateEmail(event) {

    var regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(regexEmail.test(this.value)) {
      this.classList.remove('invalid');
      this.placeholder = "";
    } else {
      this.classList.add('invalid');
    }
  }

  function validateCARD(event) {

    cardNumber    = this.value;
  
    if(cardNumber) {
      regex = /^(\d{4}\s{0,1}\d{4}\s{0,1}\d{4}\s{0,1}\d{4})$/;
      if(regex.test(cardNumber)) {
        this.classList.remove('invalid');
        this.placeholder = "";
      } else {
        this.classList.add('invalid');
      }
    }

  }

  var inputFullname = document.querySelector("#fullname");
  inputFullname.addEventListener("blur", validateEmpty);

  var inputEmail = document.querySelector("#email");
  inputEmail.addEventListener("blur", validateEmpty);
  inputEmail.addEventListener("blur", validateEmail);

  var inputPhone = document.querySelector("#phone");
  inputPhone.addEventListener("blur", validateEmpty);

  var inputCard = document.querySelector("#cardnumber");
  inputCard.addEventListener("blur", validateEmpty);
  inputCard.addEventListener("blur", validateCARD);

  var inputSafeCode = document.querySelector("#securityCode");
  inputSafeCode.addEventListener("blur", validateEmpty);

  formPayment = document.querySelector("#formPayment");
  formPayment.addEventListener("submit", function(e){
    e.preventDefault();
    
    var invalids = 0;

    var allInputs = this.querySelectorAll("input");
    allInputs.forEach(function(item){

      validateEmpty.call(item);

      if(item.getAttribute("id") == "cardnumber") {
        validateCARD.call(item);
      }

      if(item.getAttribute("id") == "email") {
        validateEmail.call(item);
      }

      if(item.classList.contains("invalid")){
        invalids += 1;
      };

    });

    if(invalids <= 0) {
      this.classList.add("finished");
      document.querySelector("#paymentSuccesful").classList.add("show");
    };
  });

  var resetCheckout = document.querySelector("#resetCheckout");
  resetCheckout.addEventListener("click", function(e){
    document.querySelector("#formPayment").reset();
  });

  

  

  
  
  

});