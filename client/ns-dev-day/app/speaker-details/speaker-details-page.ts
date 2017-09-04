import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";

import { SpeakerDetailsViewModel } from "./speaker-details-view-model";

let viewModel: SpeakerDetailsViewModel;

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
    const speakerId = args.context.speakerId;
    const speakerName = args.context.speakerName;
    viewModel = new SpeakerDetailsViewModel(speakerId, speakerName);
    page.bindingContext = viewModel;
}

/* ***********************************************************
* According to guidelines, if you have a drawer on your page, you should always
* have a button that opens it. Get a reference to the RadSideDrawer view and
* use the showDrawer() function to open the app drawer section.
*************************************************************/
export function onDrawerButtonTap(args: EventData) {
    topmost().goBack();
}

export function onItemTap(args) {
    const index = args.index;
    const session: any = viewModel.get("speakerEntry").sessions[index];

    if (!session) {
        alert("Something went terribly wrong :(");
        return;
    }

    var navEntry = {
        moduleName: "session/session-page",
        context: {
            "sessionId": session.id,
            "sessionName": session.name
        },
        animated: true,
        transition: {
            name: "curl"
        }
    };

    topmost().navigate(navEntry);
}