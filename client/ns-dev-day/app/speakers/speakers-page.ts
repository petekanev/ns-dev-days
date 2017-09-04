import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";

import { SpeakerEntry } from "../shared/speakers/speaker-entry";

import { SpeakersViewModel } from "./speakers-view-model";

let viewModel: SpeakersViewModel;

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
export function onNavigatingTo(args: NavigatedData) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }

    const page = <Page>args.object;

    page.bindingContext = viewModel = new SpeakersViewModel();
}

/* ***********************************************************
* According to guidelines, if you have a drawer on your page, you should always
* have a button that opens it. Get a reference to the RadSideDrawer view and
* use the showDrawer() function to open the app drawer section.
*************************************************************/
export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

export function onSpeakerTap(args) {
    const index = args.index;
    const speaker: SpeakerEntry = SpeakersViewModel.Speakers.getItem(index);

    if (!speaker) {
        alert("Something went terribly wrong :(");
        return;
    }

    var navEntry = {
        moduleName: "speaker-details/speaker-details-page",
        context: {
            "speakerId": speaker.id,
            "speakerName": speaker.name
        },
        animated: true,
        transition: {
            name: "curl"
        }
    };

    topmost().navigate(navEntry);
}
