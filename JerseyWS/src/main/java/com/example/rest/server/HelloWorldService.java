package com.example.rest.server;

import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Response;

import com.sun.jersey.spi.resource.Singleton;

@Path("/hello")
@Singleton
public class HelloWorldService {
	
	@GET
	@Path("/{param: [a-zA-Z][a-zA-Z_0-9]*}")
	@Consumes("text/plain")
	@Produces({ "application/xml; qs=0.9", "application/json" })
	public Response getMsg(@DefaultValue("hello") @PathParam("param") String msg) {
		
		String output = "Jersey say : " + msg;
		CacheControl cache = new CacheControl();
		cache.setMustRevalidate(true);

		return Response.status(200).entity(output).cacheControl(cache).build();
		

	}
	
}