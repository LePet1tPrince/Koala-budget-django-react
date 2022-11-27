# Generated by Django 4.1 on 2022-11-27 21:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_trxn_account'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trxn',
            name='account',
            field=models.ForeignKey(blank=True, limit_choices_to=models.Q(('accType', 'Asset'), ('accType', 'Liability'), ('accType', 'Equity'), _connector='OR'), null=True, on_delete=django.db.models.deletion.CASCADE, to='api.account'),
        ),
    ]
