import {Injectable} from '@angular/core';


@Injectable()
export class Utils {

  public static RAPIDKEY = '2c4a4fc99amshe50fdd337dd7144p16d624jsn64cd58af65a9';

  public static LEAGUEIDS = {'english': 2, 'spanish': 87, 'french': 4, 'german': 8, 'italy': 94};
  public static LEAGUENAMES = {
    2: 'English',
    87: 'Spanish',
    4: 'French',
    8: 'German',
    94: 'Italian'
  };
  public static SUPPORTEDLEAGUES = [Utils.LEAGUEIDS.english, Utils.LEAGUEIDS.spanish, Utils.LEAGUEIDS.french,
    Utils.LEAGUEIDS.german, Utils.LEAGUEIDS.italy];

  public static COUNTRYFLAGS = {
    2: 'https://www.api-football.com/public/teams/10.png',
    87: 'https://www.api-football.com/public/teams/9.jpg',
    4: 'https://www.api-football.com/public/teams/2.png',
    8: 'https://www.api-football.com/public/teams/25.jpg',
    94: 'https://www.api-football.com/public/teams/768.png'
  };

  public static TEAMSBYLEAGUEID = {
    2: ["33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52"],
    87: ["529", "530", "531", "532", "533", "536", "537", "538", "539", "540", "541", "542", "543", "545", "546", "547", "548", "720", "726", "728"],
    4: ["77", "78", "79", "80", "81", "82", "83", "84", "85", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "1063"],
    8: ["157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174"],
    94: ["487", "488", "489", "490", "491", "492", "493", "494", "495", "496", "497", "498", "499", "500", "502", "503", "505", "511", "512", "523"]
  };

  public static TEAMLOGOS = {
    33: "https://www.api-football.com/public/teams/33.png",
    34: "https://www.api-football.com/public/teams/34.png",
    35: "https://www.api-football.com/public/teams/35.png",
    36: "https://www.api-football.com/public/teams/36.png",
    37: "https://www.api-football.com/public/teams/37.png",
    38: "https://www.api-football.com/public/teams/38.png",
    39: "https://www.api-football.com/public/teams/39.svg",
    40: "https://www.api-football.com/public/teams/40.svg",
    41: "https://www.api-football.com/public/teams/41.svg",
    42: "https://www.api-football.com/public/teams/42.svg",
    43: "https://www.api-football.com/public/teams/43.png",
    44: "https://www.api-football.com/public/teams/44.png",
    45: "https://www.api-football.com/public/teams/45.png",
    46: "https://www.api-football.com/public/teams/46.svg",
    47: "https://www.api-football.com/public/teams/47.png",
    48: "https://www.api-football.com/public/teams/48.png",
    49: "https://www.api-football.com/public/teams/49.png",
    50: "https://www.api-football.com/public/teams/50.png",
    51: "https://www.api-football.com/public/teams/51.png",
    52: "https://www.api-football.com/public/teams/52.png",
    77: "https://www.api-football.com/public/teams/77.png",
    78: "https://www.api-football.com/public/teams/78.svg",
    79: "https://www.api-football.com/public/teams/79.png",
    80: "https://www.api-football.com/public/teams/80.png",
    81: "https://www.api-football.com/public/teams/81.svg",
    82: "https://www.api-football.com/public/teams/82.png",
    83: "https://www.api-football.com/public/teams/83.png",
    84: "https://www.api-football.com/public/teams/84.png",
    85: "https://www.api-football.com/public/teams/85.png",
    87: "https://www.api-football.com/public/teams/87.png",
    88: "https://www.api-football.com/public/teams/88.png",
    89: "https://www.api-football.com/public/teams/89.png",
    90: "https://www.api-football.com/public/teams/90.png",
    91: "https://www.api-football.com/public/teams/91.png",
    92: "https://www.api-football.com/public/teams/92.png",
    93: "https://www.api-football.com/public/teams/93.svg",
    94: "https://www.api-football.com/public/teams/94.svg",
    95: "https://www.api-football.com/public/teams/95.png",
    96: "https://www.api-football.com/public/teams/96.png",
    157: "https://www.api-football.com/public/teams/157.png",
    158: "https://www.api-football.com/public/teams/158.png",
    159: "https://www.api-football.com/public/teams/159.png",
    160: "https://www.api-football.com/public/teams/160.png",
    161: "https://www.api-football.com/public/teams/161.svg",
    162: "https://www.api-football.com/public/teams/162.png",
    163: "https://www.api-football.com/public/teams/163.png",
    164: "https://www.api-football.com/public/teams/164.png",
    165: "https://www.api-football.com/public/teams/165.png",
    166: "https://www.api-football.com/public/teams/166.png",
    167: "https://www.api-football.com/public/teams/167.png",
    168: "https://www.api-football.com/public/teams/168.png",
    169: "https://www.api-football.com/public/teams/169.png",
    170: "https://www.api-football.com/public/teams/170.png",
    171: "https://www.api-football.com/public/teams/171.png",
    172: "https://www.api-football.com/public/teams/172.png",
    173: "https://www.api-football.com/public/teams/173.png",
    174: "https://www.api-football.com/public/teams/174.png",
    487: "https://www.api-football.com/public/teams/487.png",
    488: "https://www.api-football.com/public/teams/488.png",
    489: "https://www.api-football.com/public/teams/489.png",
    490: "https://www.api-football.com/public/teams/490.png",
    491: "https://www.api-football.com/public/teams/491.png",
    492: "https://www.api-football.com/public/teams/492.png",
    493: "https://www.api-football.com/public/teams/493.png",
    494: "https://www.api-football.com/public/teams/494.png",
    495: "https://www.api-football.com/public/teams/495.png",
    496: "https://www.api-football.com/public/teams/496.png",
    497: "https://www.api-football.com/public/teams/497.svg",
    498: "https://www.api-football.com/public/teams/498.png",
    499: "https://www.api-football.com/public/teams/499.png",
    500: "https://www.api-football.com/public/teams/500.png",
    502: "https://www.api-football.com/public/teams/502.png",
    503: "https://www.api-football.com/public/teams/503.png",
    505: "https://www.api-football.com/public/teams/505.png",
    511: "https://www.api-football.com/public/teams/511.png",
    512: "https://www.api-football.com/public/teams/512.png",
    523: "https://www.api-football.com/public/teams/523.png",
    529: "https://www.api-football.com/public/teams/529.svg",
    530: "https://www.api-football.com/public/teams/530.png",
    531: "https://www.api-football.com/public/teams/531.png",
    532: "https://www.api-football.com/public/teams/532.png",
    533: "https://www.api-football.com/public/teams/533.png",
    536: "https://www.api-football.com/public/teams/536.png",
    537: "https://www.api-football.com/public/teams/537.png",
    538: "https://www.api-football.com/public/teams/538.png",
    539: "https://www.api-football.com/public/teams/539.png",
    540: "https://www.api-football.com/public/teams/540.png",
    541: "https://www.api-football.com/public/teams/541.png",
    542: "https://www.api-football.com/public/teams/542.png",
    543: "https://www.api-football.com/public/teams/543.png",
    545: "https://www.api-football.com/public/teams/545.svg",
    546: "https://www.api-football.com/public/teams/546.png",
    547: "https://www.api-football.com/public/teams/547.png",
    548: "https://www.api-football.com/public/teams/548.svg",
    720: "https://www.api-football.com/public/teams/720.gif",
    726: "https://www.api-football.com/public/teams/726.png",
    728: "https://www.api-football.com/public/teams/728.png",
    1063: "https://www.api-football.com/public/teams/1063.png"
  };

  public static LEAGUELOGOS = {
    2: "https://www.api-football.com/public/leagues/2.png",
    87: "https://www.api-football.com/public/leagues/87.png",
    4: "https://www.api-football.com/public/leagues/4.svg",
    8: "https://www.api-football.com/public/leagues/8.png",
    94: "https://www.api-football.com/public/leagues/94.png"
  };

  public static FIVEDAYSMS = 1000 * 60 * 60 * 24 * 5;

  // 86400000
  public static ONEDAYMS = 1000 * 60 * 60 * 24;


}
