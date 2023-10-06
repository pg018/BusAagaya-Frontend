import FirstOffer from "../../assets/trendingOfferImg/first.png";
import SecondOffer from "../../assets/trendingOfferImg/second.png";
import ThirdOffer from "../../assets/trendingOfferImg/third.png";
import FourthOffer from "../../assets/trendingOfferImg/fourth.png";

interface TrendingDataListType {
  imgUrl: string;
  textContent: string;
}

export const TrendingDataList: Array<TrendingDataListType> = [
  {
    imgUrl: FirstOffer,
    textContent: "Save up to Rs 250 on bus tickets",
  },
  {
    imgUrl: SecondOffer,
    textContent: "Save up to Rs 300 in AP, TS routes",
  },
  {
    imgUrl: ThirdOffer,
    textContent: "Save up to Rs 300 on MH, Goa, Gujarat, MP",
  },
  {
    imgUrl: FourthOffer,
    textContent: "Save up to Rs 250 on TSRTC Bus Tickets",
  },
];
