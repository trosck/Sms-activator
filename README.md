# Sms-activator


```typescript
import { Sink } from '@isor/sink';

const sink = new Sink('API_KEY');

(async () => {
    // get balance
    const balance = await sink.balance();
    
    // reserv phone
    const lease = await sink.lease();
    
    const phone = lease.phoneNumber;
    
    // cancel reserv (only before call message)
    await lease.cancel();
    
    // get sms message
    const message = await lease.message('regular');
    
    // end & forget phone number
    await lease.done();
    
})();
```