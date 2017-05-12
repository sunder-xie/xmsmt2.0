/*
 * Copyright 2005-2013 rsico. All rights reserved.
 * Support: http://www.rsico.cn
 * License: http://www.rsico.cn/license
 */
package net.wit.service;

import net.wit.entity.Appointment;

/**
 * Service - 货品
 * 
 * @author rsico Team
 * @version 3.0
 */
public interface AppointmentService extends BaseService<Appointment, Long> {

   public Appointment findDefault();
}