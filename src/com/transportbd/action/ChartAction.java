package com.transportbd.action;

import java.io.IOException;
import java.io.PrintWriter;
 
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

 
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

import com.alibaba.fastjson.JSON;
 
import com.transportbd.basefun.BaseAction;

 
import com.transportbd.entities.technoloMonth;
import com.transportbd.entities.technoloyActivity;

public class ChartAction extends  BaseAction {
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
					@SuppressWarnings("unchecked")
					List<technoloyActivity> list= session.createQuery("from technoloyActivity "+sql).list();
					
					trans.commit();
					String json=JSON.toJSONString(list);
				 
					
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
	public String Chart10fun(){
		// TODO Auto-generated method stub
		Session session =null;
				try {
					String [] idx={"业务总量","新订单","设备利用率","主营业务利润","主营业务成本"};
					session= sf.getCurrentSession();
					Transaction trans = session.beginTransaction();
					sql=getRequest().getParameter("sql");
					StringBuffer buffer=new StringBuffer();
					for (int i = 0; i < idx.length; i++) {
						if(i==0)
							buffer.append("(");
						buffer.append("'"+idx[i]+"'");
						if(i!=idx.length-1){
							buffer.append(",");
							
						}else{
							buffer.append(")");
						}
					}
					String hql="from technoloyActivity "+sql+" and idx_2 in"+buffer.toString();
					
					 
					@SuppressWarnings("unchecked")
					List<technoloyActivity> list= session.createQuery(hql).list();
					Map<String, Object> mapp=new HashMap<>();
					for (int i = 0; i < list.size(); i++) {
						Set<technoloMonth> months = list.get(i).getTechnoloMonths();
						Iterator<technoloMonth> it = months.iterator();
						Map<String, Double> monthvalue=new HashMap<>();
					 
						while(it.hasNext()){
							technoloMonth month=it.next();
							String year=month.getIdx_month().split("-")[0];
							
							if(monthvalue.get(year)!=null){
								double value=Double.parseDouble(month.getIdx_value())+monthvalue.get(year);
								monthvalue.put(year,value);
							}else if(month.getIdx_month().split("-")[1].equals("01"))
							monthvalue.put(year,0.0);
						}
						mapp.put(list.get(i).getIdx_2(), monthvalue);
					} 
					trans.commit();
					String json=JSON.toJSONString(mapp);
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
}
