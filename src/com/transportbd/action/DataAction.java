package com.transportbd.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.transportbd.basefun.BaseAction;
import com.transportbd.entities.technoloyActivity;

public class DataAction extends BaseAction{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String sql;
	 
	private static SessionFactory sf=null;
	static{
		Configuration config = new Configuration();
		config.configure();
		StandardServiceRegistryBuilder registryBuilder = new StandardServiceRegistryBuilder();
		StandardServiceRegistry registry = registryBuilder.build();
		 sf = config.buildSessionFactory(registry);
	}
	public String unitsql(){
		// TODO Auto-generated method stub
		Session session =null;
				try {
					
					session= sf.getCurrentSession();
					Transaction trans = session.beginTransaction();
					sql=getRequest().getParameter("sql");
					System.out.println(sql);
					@SuppressWarnings("unchecked")
					List<technoloyActivity> list= session.createQuery("from technoloyActivity "+sql).list();
					
					trans.commit();
					String json=JSON.toJSONString(list);
					System.out.println(json);
					
					 HttpServletResponse response = getResponse();
					 response.setContentType("text/html;charset=utf-8");
					PrintWriter pw = response.getWriter();
					pw.write(json);
					pw.flush();
					pw.close();
				} catch (HibernateException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally{
					if(session!=null){
					session.clear();
					session.close();
					}
				}
		return null;
	}
	public String myChartData2(){
		// TODO Auto-generated method stub
				Session session =null;
						try {
							
							session= sf.getCurrentSession();
							Transaction trans = session.beginTransaction();
							sql=getRequest().getParameter("sql");
							System.out.println(sql);
							@SuppressWarnings("unchecked")
							List<technoloyActivity> list= session.createQuery("select  t  from technoloyActivity t  "
									+ "inner join fetch t.technoloYears y "+sql
									+" and y.idx_year between 2005 and 2015").list();
							
							trans.commit();
							SerializerFeature feature=SerializerFeature.DisableCheckSpecialChar;
							byte [] bytes=JSON.toJSONBytes(list, feature);
							System.out.println(new String(bytes));
							
							 HttpServletResponse response = getResponse();
							 response.setContentType("text/html;charset=utf-8");
							PrintWriter pw = response.getWriter();
							pw.write(new String(bytes));
							pw.flush();
							pw.close();
						} catch (HibernateException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} finally{
							if(session!=null){
							session.clear();
							session.close();
							}
						}
		return null;
	}
}
