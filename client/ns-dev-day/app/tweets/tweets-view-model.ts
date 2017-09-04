import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { request, HttpRequestOptions } from "http";

export class TweetsViewModel extends Observable {
   static NSTweets: ObservableArray<Tweet> = new ObservableArray();

    constructor() {
        super();
        
        if (TweetsViewModel.NSTweets.length < 1) {
            const requestOptions: HttpRequestOptions = {
                url: "https://api.twitter.com/1.1/search/tweets.json?q=%23NativeScript&result_type=recent",
                headers: {
                    Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAAAqV2AAAAAAAAW%2BRfD5YPhcJmnEQErGpBw2gDGA%3DxOTFG633CY24wqx1Z1I7zdaJDh0He5UNF0n6D0RvcM3T1nKmYw"
                },
                method: "GET"
            };

            request(requestOptions).then((res) => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    let jsonRes = res.content.toJSON();
                    let resTweets = jsonRes.statuses;
                    resTweets.forEach(element => {
                        const tweet = new Tweet(element.createdAt, element.text, element.user.name, element.user.screen_name, element.user.profile_image_url);
                        TweetsViewModel.NSTweets.push(tweet);
                        debugger;
                    });
                } else {
                    alert("Failed fetching Twitter statuses. Code: " + res.statusCode);
                }
            }, (rej) => {
                alert("Failed to make request to Twitter API. " + rej);
            }).catch((err) => {
                alert("Failed to make request to Twitter API. " + err);
            });
        }
    }

    get tweets() {
        return TweetsViewModel.NSTweets;
    }
}

class Tweet {
    public createdAt: string;
    public text: string;
    public userName: string;
    public screenName: string;
    public profileImageUrl: string;

    constructor(createdAt, text, userName, screenName, profileImageUrl) {
        this.createdAt = new Date(createdAt).toLocaleDateString();
        this.text = text;
        this.userName = userName;
        this.screenName = "@" + screenName;
        this.profileImageUrl = profileImageUrl;
    }
}