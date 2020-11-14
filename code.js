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
        var orderPrice = 0
        //Takes the data values from the sizeDetails Form and passes it out to the
        function Size(event){
            event.preventDefault()
            var selectedSizeRadioButton = $("input[name=size]:checked");
            var selectedSize = selectedSizeRadioButton.data("size")
            switch(selectedSize){
                case "Small":
                    orderPrice+=6.99;
                    break;
                case "Medium":
                    orderPrice+=8.99;
                    break;
                default:
                    orderPrice+=11.99;
                    break;
            }
            $("#pizzaSize").text("Size: " + selectedSize)
            $("#sizeDetails").hide();
            //I still haven't figured out how to get Javascript to stop panicking if I call a selector more than once.
            $("#crustDetails").show();
            $("input[name=crust]").change(Crust)
            function Crust(event)
            {
                event.preventDefault()
                var selectedCrustRadioButton = $("input[name=crust]:checked");
                var selectedCrust = selectedCrustRadioButton.data("crust")
                switch(selectedCrust){
                    case "Thin":
                        orderPrice+=1.00
                        break;
                    case "Vegan":
                        orderPrice+=1.50
                        break;
                    default: break;
                }
                $("#pizzaCrust").text("Crust: " + selectedCrust)
                $("#crustDetails").hide();
                $("#meatsDetails").show();
                $("form").submit(Meats)
                function Meats(event){
                    event.preventDefault()
                    var selected = [];
                    $('#meatsDetails input:checked').each(function() {
                        selected.push($(this).attr('data-meats'));
                    });
                    selected.forEach(function(){orderPrice+= (selected.length * 1.50)})


                    $("#pizzaMeats").text("Meats: " + selected.toString())
                    $("#meatsDetails").hide();
                    $("#veggiesDetails").show();
                    $("form").submit(Veggies)
                    function Veggies(event){
                        event.preventDefault()
                        var selected = [];
                        $('#veggiesDetails input:checked').each(function() {
                            selected.push($(this).attr('data-veggies'));
                        });
                        selected.forEach(function(){orderPrice+= (selected.length)})
                        $("#pizzaVeggies").text("Veggies: " + selected.toString())
                    }
                }
            }
            }
        }
    );