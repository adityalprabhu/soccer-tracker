import { Injectable } from '@angular/core';


@Injectable()
export class Utils {

  public static LEAGUEIDS = {"english": 2, "spanish": 87, "french": 4, "german": 8, "italy": 94};
  public static SUPPORTEDLEAGUES = [Utils.LEAGUEIDS.english, Utils.LEAGUEIDS.spanish, Utils.LEAGUEIDS.french,
    Utils.LEAGUEIDS.german, Utils.LEAGUEIDS.italy];
  public static COUNTRYFLAGS = {
    2: "https://www.api-football.com/public/teams/10.png",
    87: "https://www.api-football.com/public/teams/9.jpg",
    4: "https://www.api-football.com/public/teams/2.png",
    8: "https://www.api-football.com/public/teams/25.jpg",
    94: "https://www.api-football.com/public/teams/768.png"
  };


}
