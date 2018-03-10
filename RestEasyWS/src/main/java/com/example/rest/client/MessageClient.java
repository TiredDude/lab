package com.example.rest.client;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.jboss.resteasy.client.ClientRequest;
import org.jboss.resteasy.client.ClientResponse;

public class MessageClient {

	public static void main(String[] args) throws Exception {

		ClientRequest request = new ClientRequest("http://localhost:8080/RestEasyWS/rest/message/test");
		request.accept("application/json");
		
		//POST
		request.body("application/json", "{\"qty\":100,\"name\":\"iPad4\"}");

		ClientResponse<String> response = request.get(String.class);
		if (response.getStatus() != 200) {
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus());
		}

		BufferedReader br = new BufferedReader(
				new InputStreamReader(new ByteArrayInputStream(response.getEntity().getBytes())));

		String output;
		System.out.println("Output from Server .... \n");
		while ((output = br.readLine()) != null) {
			System.out.println(output);
		}
	}

	public void apacheHttpClient() throws ClientProtocolException, IOException {

		DefaultHttpClient httpClient = new DefaultHttpClient();
		
		//GET
		HttpGet getRequest = new HttpGet("http://localhost:8080/RESTfulExample/json/product/get");
		getRequest.addHeader("accept", "application/json");

		//POST
		HttpPost postRequest = new HttpPost("http://localhost:8080/RESTfulExample/json/product/post");
		StringEntity input = new StringEntity("{\"qty\":100,\"name\":\"iPad 4\"}");
		input.setContentType("application/json");
		postRequest.setEntity(input);

		HttpResponse response = httpClient.execute(getRequest);

		if (response.getStatusLine().getStatusCode() != 200) {
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatusLine().getStatusCode());
		}

	}

}
