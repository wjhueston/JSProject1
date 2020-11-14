$(document).ready(
    function () {
        //Events
        $("#tabs a").click(showTab);
        //This is all stuff I picked up in class, but stick with me, because I'm pretty sure I violate all five SOLID principles at least once.
        //This selector listens for a radio button click, and invokes the Size function
        $("input[name=size]").change(Size)


        //Functions
        function showTab(event) {
            event.preventDefault();
            $(this).tab("show");
        }
        var pizzaInfo = []
        //Takes the data values from the sizeDetails Form and uses a switch to add to the user's tab.
        function Size(event){
            event.preventDefault()
            var selectedSizeRadioButton = $("input[name=size]:checked");
            var selectedSize = selectedSizeRadioButton.data("size")
            var sizePrice;
            switch(selectedSize){
                case "Small":
                    sizePrice=6.99;
                    break;
                case "Medium":
                    sizePrice=8.99;
                    break;
                default:
                    sizePrice=11.99;
                    break;
            }
            $("#pizzaSize").text("Size: " + selectedSize)
            $("#pizzaDetails").show()
            pizzaInfo[0] ="Size: " + selectedSize
            $("#sizeDetails").hide();
            //I still haven't figured out how to get Javascript to stop panicking if I call a selector more than once.
            $("#crustDetails").show();
            $("input[name=crust]").change(Crust)
            function Crust(event)
            {
                event.preventDefault()
                var selectedCrustRadioButton = $("input[name=crust]:checked");
                var selectedCrust = selectedCrustRadioButton.data("crust")
                var crustPrice = 0
                switch(selectedCrust){
                    case "Thin":
                        crustPrice=1.00
                        break;
                    case "Vegan":
                        crustPrice=1.50
                        break;
                    default: break;
                }
                $("#pizzaCrust").text("Crust: " + selectedCrust)
                pizzaInfo[1] = "Crust: " + selectedCrust
                $("#crustDetails").hide();
                //I effectively nested each function inside the last in order to prevent the user from doing things out of order.
                //Needless to say the object-oriented part of my brain is upset
                $("#meatsDetails").show();
                $("form").submit(Meats)
                function Meats(event){
                    event.preventDefault()
                    var selected = [];
                    $('#meatsDetails input:checked').each(function() {
                        selected.push($(this).attr('data-meats'));
                    });
                    var meatsPrice = selected.length * 1.50
                    selected.toString = function() {
                        return this.join(', ');
                    }
                    if(selected.length !== 0){
                        $("#pizzaMeats").text("Meats: " + selected.toString())
                        pizzaInfo[2] = "Meats: " + selected.toString()
                    }
                    else{
                        $("#pizzaMeats").text("Meats: None")
                        pizzaInfo[2] = "Meats: None"
                    }
                    $("#meatsDetails").hide();
                    $("#veggiesDetails").show();
                    $("form").submit(Veggies)
                    function Veggies(event){
                        event.preventDefault()
                        var selected = [];
                        $('#veggiesDetails input:checked').each(function() {
                            selected.push($(this).attr('data-veggies'));
                        });
                        var veggiesPrice = selected.length
                        selected.toString = function(){
                            return this.join(', ');
                        }
                        if(selected.length !== 0){
                            $("#pizzaVeggies").text("Veggies: " + selected.toString())
                            pizzaInfo[3] = "Veggies: " + selected.toString()
                        }
                        else{
                            $("#pizzaVeggies").text("Veggies: None")
                            pizzaInfo[3] = "Veggies: None"
                        }
                        $("#veggiesDetails").hide();
                        $("#endPizzaDetails").show();
                        //End of the first tab. Once you hit submit on the veggies pane, the Delivery tab will appear and you can proceed.
                        var element = document.querySelector('#deliveryTab');
                        element.style.visibility = "visible";
                        //Gathers contact info from the form on the second tab on click of the submit button
                        $("form").submit(contactInfo)
                        function contactInfo(){
                            var contactInfo = []
                            contactInfo[0] = $("#firstName").val();
                            contactInfo[1] = $("#lastName").val();
                            contactInfo[2] = $("#addressLineOne").val();
                            contactInfo[3] = $("#addressLineTwo").val();
                            contactInfo[4] = $("#city").val();
                            contactInfo[5] = $("#postalCode").val();
                            contactInfo[6] = $("#phoneNumber").val();
                            //I ended up putting all the string values in a single Array. There's definitely an easier way to do this.
                            //I could potentially just have used the .val() method all the way to the end.
                            $("#deliveryDetails").hide();
                            $("#endContactDetails").show();
                            //End of the second tab. Closes all forms and shows a success message, and conjures the third tab
                            var element = document.querySelector('#confirmTab');
                            element.style.visibility = "visible";
                            //Parroting back all the pertinent information to the user.
                            $("#sizeConfirm").text(pizzaInfo[0])
                            $("#sizePrice").text(sizePrice.toFixed(2))
                            $("#crustConfirm").text(pizzaInfo[1])
                            $("#crustPrice").text(crustPrice.toFixed(2))
                            $("#meatsConfirm").text(pizzaInfo[2])
                            $("#meatsPrice").text(meatsPrice.toFixed(2))
                            $("#veggiesConfirm").text(pizzaInfo[3])
                            $("#veggiesPrice").text(veggiesPrice.toFixed(2))
                            $("#firstAndLast").text(contactInfo[0] + " " + contactInfo[1])
                            if(contactInfo[3] === ""){
                                $("#address").text(contactInfo[2])
                            }
                            else
                            {
                                $("#address").text(contactInfo[2] + ", " + contactInfo[3])
                            }
                            $("#cityAndZip").text(contactInfo[4] + " " + contactInfo[5])
                            $("#phone").text("Phone: " + contactInfo[6])
                            var subtotal = sizePrice + crustPrice + meatsPrice + veggiesPrice
                            $("#subtotal").text(subtotal.toFixed(2))
                            var taxAmount = subtotal * 0.051
                            $("#taxAmount").text(taxAmount.toFixed(2))
                            var total = subtotal + taxAmount + 2.00
                            $("#total").text(total.toFixed(2))
                        }
                    }
                }
            }
            }
        }
    );