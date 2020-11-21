// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function() {
    // Adding an event listener to the digesting buttons to change the digesting boolean in the db
    $(".change-digesting").on("click", function(event) {
      let id = $(this).data("id");
      let burgerEat = $(this).data("digesting");
      
      let newDigestingState = {
        digesting: true
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDigestingState
      }).then(
        function() {
          console.log("changed digesting state to", burgerEat);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

    $(".regurgitate").on("click", function(event) {
        let id = $(this).data("id");
        let burgerEat = $(this).data("digesting");
        
        let newDigestingState = {
          digesting: false
        };
    
        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
          type: "PUT",
          data: newDigestingState
        }).then(
          function() {
            console.log("changed digesting state to", burgerEat);
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });

    // Adding an event listener for the delete button
    $(".discard-burger").on("click", function(event) {
        let id = $(this).data("id");
    
        // Send the DELETE request.
        $.ajax("/api/burgers/" + id, {
          type: "DELETE"
        }).then(
          function() {
            console.log("deleted", id);
            // Reload the page to get the updated list
            location.reload();
          }
        );
    });
      

    

    // Adding an event listener to add a new burger when the submit button is pressed
    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
    
        let newBurger = {
          burger_name: $("#burgerName").val().trim(),
          digesting: $("[name=digesting]:checked").val().trim()
        };
    
        // Send the POST request.
        $.ajax("/api/burgers", {
          type: "POST",
          data: newBurger
        }).then(
          function() {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });

});
  