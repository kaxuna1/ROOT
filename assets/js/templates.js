/**
 * Created by KGelashvili on 10/27/2015.
 */
var userRegistrationFormTemplate='<form>    <div class="form-group">        <label for="nameField">სახელი</label>        <input type="text" name="name" class="form-control" id="nameField" placeholder="სახელი">    </div>    <div class="form-group">        <label for="surnameField">გვარი</label>        <input type="text" name="surname" class="form-control" id="surnameField" placeholder="გვარი">    </div>    <div class="form-group">        <label for="usernameField">მომხმარებლის სახელი</label>        <input type="text" name="username" class="form-control" id="usernameField" placeholder="მომხმარებლის სახელი">    </div>    <div class="form-group">        <label for="passwordField">პაროლი</label>        <input type="text" name="password" class="form-control" id="passwordField" placeholder="პაროლი">    </div>    <div class="form-group">        <label for="emailField">ელ ფოსტა</label>        <input type="text" name="email" class="form-control" id="emailField" placeholder="ელ ფოსტა">    </div>    <div class="form-group">        <label for="addressField">მისამართი</label>        <input type="text" name="address" class="form-control" id="addressField" placeholder="მისამართი">    </div>    <div class="form-group">        <label for="mobileField">მობილური</label>        <input type="text" name="mobile" class="form-control" id="mobileField" placeholder="მობილური">    </div>    <div class="form-group">        <label for="personalNumberField">პირადი ნომერი</label>        <input type="text" name="personalNumber" class="form-control" id="personalNumberField" placeholder="პირადი ნომერი">    </div>    <div class="form-group">        <label for="organisationIdField">ორგანიზაცია</label>        <select name="organisationId" id="organisationIdField" class="form-control">        </select>    </div>    <div class="form-group">        <label for="typeField">მომხმარებლის ტიპი</label>        <select name="type" id="typeField" class="form-control">        </select>    </div>    <div class="form-group">        <label for="regionIdField">რეგიონი</label>        <select name="regionId" id="regionIdField" class="form-control">        </select>    </div>    <div class="form-group">        <label for="zoneIdField">ზონა</label>        <select name="zoneId" id="zoneIdField" class="form-control">        </select>    </div></form>';
var organizationRegistrationFormTemplate='<form>    <div class="form-group">        <label for="nameField">სახელი</label>        <input type="text" name="name" class="form-control" id="nameField" placeholder="სახელი">    </div>    <div class="form-group">        <label for="emailField">ელ ფოსტა</label>        <input type="text" name="email" class="form-control" id="emailField" placeholder="ელ ფოსტა">    </div>    <div class="form-group">        <label for="addressField">მისამართი</label>        <input type="text" name="address" class="form-control" id="addressField" placeholder="მისამართი">    </div>    <div class="form-group">        <label for="mobileField">მობილური</label>        <input type="text" name="mobileNumber" class="form-control" id="mobileField" placeholder="მობილური">    </div>    <div class="form-group">        <label for="regionIdField">რეგიონი</label>        <select name="regionId" id="regionIdField" class="form-control">        </select>    </div></form>';
var regionRegistrationFormTemplate='<form>    <div class="form-group">        <label for="nameField">სახელი</label>        <input type="text" name="name" class="form-control" id="nameField" placeholder="სახელი">    </div></form>';
var formatRegistrationFormTemplate='<form>    <div class="form-group">        <label for="nameField">სახელი</label>        <input type="text" name="name" class="form-control" id="nameField" placeholder="სახელი">    </div>    <div class="form-group">        <label for="priceField">ფასი</label>        <input type="text" name="price" class="form-control" id="priceField" placeholder="ფასი">    </div>    </form>';
var serviceTypeRegistrationFormTemplate='<form>    <div class="form-group">        <label for="nameField">სახელი</label>        <input type="text" name="name" class="form-control" id="nameField" placeholder="სახელი">    </div>    <div class="form-group">        <label for="priceField">ფასზე ნამატი</label>        <input type="text" name="price" class="form-control" id="priceField" placeholder="ფასზე ნამატი">    </div>    </form>';
var parcelRegistrationFormTemplate='<form>    <div class="form-group">        <label for="recieverField">მიმღები</label>        <input type="text" name="reciever" class="form-control" id="recieverField" placeholder="მიმღები">    </div>    <div class="form-group">        <label for="addressField">მისამართი</label>        <input type="text" name="address" class="form-control" id="addressField" placeholder="გვარი">    </div>    <div class="form-group">        <label for="sentFromField">გაგზავნილია მისამართიდან</label>        <input type="text" name="sentFrom" class="form-control" id="sentFromField" placeholder="გაგზავნილია მისამართიდან">    </div>    <div class="form-group">        <label for="barcodeField">ბარკოდი</label>        <input type="text" name="password" class="form-control" id="barcodeField" placeholder="ბარკოდი">    </div>    <div class="form-group">        <label for="formatIdField">ფორმატი</label>        <select name="type" id="formatIdField" class="form-control">        </select>    </div>    <div class="form-group">        <label for="serviceTypeIdField">სერვისის ტიპი</label>        <select name="regionId" id="serviceTypeIdField" class="form-control">        </select>    </div></form>';