/**
 * Copyright 2017-2022 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster Online project, see https://github.com/jhipster/jhipster-online
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { JhonlineTestModule } from '../../../test.module';
import { LogsComponent } from 'app/admin/logs/logs.component';
import { LogsService } from 'app/admin/logs/logs.service';
import { Log } from 'app/admin/logs/log.model';

describe('Component Tests', () => {
  describe('LogsComponent', () => {
    let comp: LogsComponent;
    let fixture: ComponentFixture<LogsComponent>;
    let service: LogsService;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [JhonlineTestModule],
        declarations: [LogsComponent],
        providers: [LogsService]
      })
        .overrideTemplate(LogsComponent, '')
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(LogsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LogsService);
    });

    describe('OnInit', () => {
      it('should set all default values correctly', () => {
        expect(comp.filter).toBe('');
        expect(comp.orderProp).toBe('name');
        expect(comp.reverse).toBe(false);
      });

      it('Should call load all on init', () => {
        // GIVEN
        const log = new Log('main', 'WARN');
        spyOn(service, 'findAll').and.returnValue(
          of({
            loggers: {
              main: {
                effectiveLevel: 'WARN'
              }
            }
          })
        );

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(service.findAll).toHaveBeenCalled();
        expect(comp.loggers && comp.loggers[0]).toEqual(jasmine.objectContaining(log));
      });
    });

    describe('change log level', () => {
      it('should change log level correctly', () => {
        // GIVEN
        const log = new Log('main', 'ERROR');
        spyOn(service, 'changeLevel').and.returnValue(of({}));
        spyOn(service, 'findAll').and.returnValue(
          of({
            loggers: {
              main: {
                effectiveLevel: 'ERROR'
              }
            }
          })
        );

        // WHEN
        comp.changeLevel('main', 'ERROR');

        // THEN
        expect(service.changeLevel).toHaveBeenCalled();
        expect(service.findAll).toHaveBeenCalled();
        expect(comp.loggers && comp.loggers[0]).toEqual(jasmine.objectContaining(log));
      });
    });
  });
});
