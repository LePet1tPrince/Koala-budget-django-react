# Generated by Django 4.1 on 2023-01-16 19:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_budget_month_alter_budget_year'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budget',
            name='category',
            field=models.ForeignKey(blank=True, limit_choices_to=models.Q(('type', 'Flow')), null=True, on_delete=django.db.models.deletion.CASCADE, related_name='budget_category', to='api.account'),
        ),
    ]