package com.bunge.trade.mapper;

import com.bunge.trade.domain.Report;
import com.bunge.trade.domain.Trade;
import com.bunge.trade.domain.TradeImage;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface TradeMapper {
    int getListCount();
    List<Trade> getTradeList(HashMap<String, Integer> map);
    int insertTrade(Trade trade);
    void insertTradeImage(TradeImage tradeImage);
    List<TradeImage> getTradeImages(int tradeNo);
    List<Trade> selectTradeByCategoryID(String categoryID);
    Trade getDetail(int tradeNo);
    int setReadCountUpdate(int tradeNo);
    void updateTrade(Trade trade);
    int deleteTrade(int tradeNo);
    Trade getTrade(int tradeNo);
    void insertReport(Report report);
}
