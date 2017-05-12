package net.wit.util;


import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
public class ApplicationContextUtil implements ApplicationContextAware{
	private static ApplicationContext context;

	@Override
	public void setApplicationContext(ApplicationContext context)
			throws BeansException {
		this.context = context;		
	}

	public static ApplicationContext getContext() {
		return context;
	}
	public static Object getBean(String beanId){
		return getContext().getBean(beanId);
	}

	
	
}
