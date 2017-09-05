import { Observable } from "data/observable";

/* ***********************************************************
* Keep data that is displayed in your app drawer in the MyDrawer custom component view model.
*************************************************************/
export class MyDrawerViewModel extends Observable {
    private _navigationItems: Array<any>;

    /* ***********************************************************
    * Use the MyDrawer view model constructor to initialize the properties data values.
    * The navigationItems property is initialized here and is data bound to <ListView> in the MyDrawer view file.
    * Add, remove or edit navigationItems to change what is displayed in the app drawer list.
    *************************************************************/
    constructor(selectedPage: string) {
        super();

        this._navigationItems = [
            {
                title: "Home",
                name: "home",
                route: "home/home-page",
                icon: "\uf015",
                isSelected: selectedPage === "Home"
            },
            {
                title: "Sessions",
                name: "sessions",
                route: "sessions/sessions-page",
                icon: "\uf19d",
                isSelected: selectedPage === "Search"
            },
            {
                title: "Speakers",
                name: "speakers",
                route: "speakers/speakers-page",
                icon: "\uf007",
                isSelected: selectedPage === "Speakers"
            },
            {
                title: "#NativeScript",
                name: "tweets",
                route: "tweets/tweets-page",
                icon: "\uf099",
                isSelected: selectedPage === "#NativeScript"
            },
            // TODO: Replace with actual pages when implemented
            {
                title: "Sponsors",
                name: "sponsors",
                route: "home/home-page",
                icon: "\uf0a4",
                isSelected: selectedPage === "Event Info"
            },
            {
                title: "Event Info",
                name: "info",
                route: "home/home-page",
                icon: "\uf129",
                isSelected: selectedPage === "Event Info"
            }
        ];
    }

    get navigationItems(): Array<any> {
        return this._navigationItems;
    }
}
