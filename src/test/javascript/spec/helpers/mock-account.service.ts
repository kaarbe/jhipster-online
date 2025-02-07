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
import Spy = jasmine.Spy;
import { of } from 'rxjs';

import { SpyObject } from './spyobject';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

export class MockAccountService extends SpyObject {
  getSpy: Spy;
  saveSpy: Spy;
  deleteSpy: Spy;
  authenticateSpy: Spy;
  identitySpy: Spy;
  getAuthenticationStateSpy: Spy;

  constructor() {
    super(AccountService);

    this.getSpy = this.spy('get').andReturn(this);
    this.saveSpy = this.spy('save').andReturn(this);
    this.deleteSpy = this.spy('delete').andReturn(of(null));
    this.authenticateSpy = this.spy('authenticate').andReturn(this);
    this.identitySpy = this.spy('identity').andReturn(of(null));
    this.getAuthenticationStateSpy = this.spy('getAuthenticationState').andReturn(of(null));
  }

  setIdentityResponse(account: Account | null): void {
    this.identitySpy = this.spy('identity').andReturn(of(account));
    this.getAuthenticationStateSpy = this.spy('getAuthenticationState').andReturn(of(account));
  }
}
