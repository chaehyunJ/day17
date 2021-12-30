package com.itbank.service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;

import org.springframework.stereotype.Service;

@Service
public class CovidService {

	private final String url = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson";
	private final String serviceKey = "q6WAnLS1b6vUa9VoLCKmB14TY6kJ3AotCfHj10BgvLRuyQTk6nnlrOruwjHTWL9K8XZ%2B8L6Ic26%2BDJdRsSzOTw%3D%3D";
	
	public String getData() throws IOException {
		
		String queryString = "?";
		
		queryString += "serviceKey=" + serviceKey + "&";
		queryString += "pageNo=" + 1 + "&";
		queryString += "numOfRows=" + 10 + "&";
		queryString += "startCreateDt=" + 20211230 + "&";
		queryString += "endCreateDt=" + 20211230 + "&";
		
		URL requestURL = new URL(url + queryString);
		HttpURLConnection conn = (HttpURLConnection)requestURL.openConnection();
		
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-type", "application/json; charset=utf-8");
		
		Scanner sc = null;
		String xmlData = "";
		
		if(conn.getResponseCode() == 200) {
			sc = new Scanner(conn.getInputStream());
			
			while(sc.hasNext()) {
				xmlData += sc.nextLine();
			}
			sc.close();
			conn.disconnect();
			return xmlData;
		}
		
		return null;
	}

}
