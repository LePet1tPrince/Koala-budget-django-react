# Generated by Django 4.1 on 2022-12-03 20:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_goal_rename_accname_account_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='budget',
            name='account',
        ),
        migrations.AlterField(
            model_name='budget',
            name='category',
            field=models.ForeignKey(limit_choices_to=models.Q(('type', 'Flow')), on_delete=django.db.models.deletion.CASCADE, related_name='budget_category', to='api.account'),
        ),
        migrations.AlterField(
            model_name='trxn',
            name='account',
            field=models.ForeignKey(limit_choices_to=models.Q(('type', 'Own')), on_delete=django.db.models.deletion.CASCADE, related_name='account', to='api.account'),
        ),
        migrations.AlterField(
            model_name='trxn',
            name='category',
            field=models.ForeignKey(limit_choices_to=models.Q(('type', 'Flow')), on_delete=django.db.models.deletion.CASCADE, related_name='category', to='api.account'),
        ),
    ]