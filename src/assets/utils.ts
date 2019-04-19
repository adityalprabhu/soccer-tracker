import { Injectable } from '@angular/core';


@Injectable()
export class Utils {

  public static LEAGUEIDS = {"english": 2, "spanish": 87, "french": 4, "german": 8, "italy": 94};
  public static SUPPORTEDLEAGUES = [Utils.LEAGUEIDS.english, Utils.LEAGUEIDS.spanish, Utils.LEAGUEIDS.french,
    Utils.LEAGUEIDS.german, Utils.LEAGUEIDS.italy];

}
