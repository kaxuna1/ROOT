/**
 * Created by kakha on 11/12/2015.
 */
var currentPage = 0;
var currentData;
var parcelColumns = ["#","მისამართი", "ბარკოდი", "მოსალოდნელი მიტანის დრო", "მიმღები"];
var userColumns = ["სახელი", "გვარი", "მომხმარებლის სახელი", "პირადი ნომერი", "მობილური"];
var organisationColumns = ["სახელი", 'მობილური', 'მისამართი', 'ელ.ფოსტა'];
var regionColumns = ["სახელი"];
var formatColumns = ["სახელი", "ფასი"];
var serviceTypeColumns = ["სახელი", "ფასზე ნამატი"];
var zoneColumns = ["სახელი", "რეგიონი"];
var parcelViewColumns = {
    "address": "მისამართი",
    "barcode": "ბარკოდი",
    "expectedDeliveryDate": "სავარაუდო მიტანის დრო",
    "sentFrom": "გაიგზავნა მისამართიდან",
    "format": "ფორმატი",
    "organisation": "ორგანიზაცია",
    "reciever": "მიმღები",
    "status": "სტატუსი",
    "serviceType": "სერვისის ტიპი",
    "deliveryDate": "მიტანის დრო",
    "comment": "კომენტარი"
};
var parcelStatuses = {
    "1": "დარეგისტრირდა",
    "2": "აიღო კურიერმა",
    "3": "შემოვიდა საწყობში",
    "4": "გადაეცა კურიერს",
    "5": "მიტანილია"
};
var userTypes = {
    "1": "sa",
    "2": "ადმინისტრატორი",
    "3": "ორგანიზაცია",
    "4": "ორგანიზაციის მომხმარებელი",
    "5": "ბუღალტერი",
    "6": "რეგიონის მენეჟერი",
    "7": "ზონის მენეჟერი",
    "8": "კურიერი"
};
var canCreateParcels = false;
var canCreateUsers = false;
var topPanelButtons=$("#topPanelButtons");
var addZoneToSelectedVisible=false;