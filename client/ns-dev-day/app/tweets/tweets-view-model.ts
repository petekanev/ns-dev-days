import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { request, HttpRequestOptions } from "http";

export class TweetsViewModel extends Observable {
    static NSTweets: ObservableArray<Tweet> = new ObservableArray();
    static mockTweets: Tweet[] = [
        {
            createdAt: "Thu Sep 07 17:38:12 +0000 2017",
            text: "What a #BeautifulWorld would it be for us developers if we didn't have to test our apps in shitty phones #FirstWorldProblems #Nativescript \ud83d\ude12",
            userName: "Alvaro Nicoli",
            screenName: "@xmr_nkr",
            profileImageUrl: "http:\/\/pbs.twimg.com\/profile_images\/895006836247711745\/4TMle4xQ_normal.jpg",
        },
        {
            createdAt: "Thu Sep 07 17:38:12 +0000 2017",
            text: "What a #BeautifulWorld.",
            userName: "Alvaro Nicoli",
            screenName: "@xmr_nkr",
            profileImageUrl: "http:\/\/pbs.twimg.com\/profile_images\/895006836247711745\/4TMle4xQ_normal.jpg",
        }
    ]

    constructor() {
        super();

        const requestOptions: HttpRequestOptions = {
            url: "https://api.twitter.com/1.1/search/tweets.json?q=%23NativeScript&result_type=recent",
            headers: {
                Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAAAqV2AAAAAAAAW%2BRfD5YPhcJmnEQErGpBw2gDGA%3DxOTFG633CY24wqx1Z1I7zdaJDh0He5UNF0n6D0RvcM3T1nKmYw"
            },
            method: "GET"
        };

        TweetsViewModel.mockTweets.forEach(tweet => TweetsViewModel.NSTweets.push(tweet));

        request(requestOptions).then((res) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                debugger;
            } else {
                alert("Failed fetching Twitter statuses. Code: " + res.statusCode);
            }
        }, (rej) => {
            alert("Failed to make request to Twitter API. " + rej);
        }).catch((err) => {
            alert("Failed to make request to Twitter API. " + err);
        });
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